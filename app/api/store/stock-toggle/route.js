import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

//toggle stock of a product
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: "Missing ProductID" }, { status: 400 });
    }

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    //check if product exists
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId,
      },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.update({
      where: { id: productId },
      data: { inStock: !product.inStock },
    });

    return NextResponse.json({ message: "Stock Updated Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
