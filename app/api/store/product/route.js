import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { format } from "date-fns";
import { NextResponse } from "next/server";

//Add new product
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 400 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const category = formData.get("category");
    const images = formData.getAll("images");

    if (
      !name ||
      !description ||
      !mrp ||
      !price ||
      !category ||
      !images.length < 1
    ) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    //Upload images to ImageKit
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const buffer = Buffer.from(await image.arrayBuffer());
        const response = await imagekit.upload({
          file: buffer,
          fileName: image.name,
          folder: "products",
        });
        const url = imagekit.url({
          path: response.path,
          transformation: [
            { quality: "auto" },
            { width: "1024" },
            { format: "webp" },
          ],
        });
        return url;
      })
    );

    await prisma.product.create({
      data: {
        name: name,
        description: description,
        mrp: mrp,
        price: price,
        category: category,
        images: imageUrls,
        storeId: storeId,
      },
    });

    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}

//Get all products for a seller
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 400 });
    }
    const products = await prisma.product.findMany({
      where: { storeId },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
