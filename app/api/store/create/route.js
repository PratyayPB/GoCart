import imagekit from "@/configs/imageKit";
import { getAuth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import ImageKit from "@imagekit/nodejs";
//create store
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    //Get the data from the form
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return new Response(
        JSON.stringify({ message: "Please fill all the fields" }),
        {
          status: 400,
        }
      );
    }

    //check if user has already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    //if store is already registered, return status
    if (store) {
      return NextResponse.json({ status: store.status });
    }

    //if username is already taken, return error
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    //Image upload to Imagekit
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");
    const response = await imagekit.files.upload({
      file: base64,
      fileName: image.name,
      folder: "logos",
    });
    if (!response) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 400 }
      );
    }

    const optimizedImage = imagekit.helper.buildSrc({
      path: response.path,
      transformation: [
        { quality: "auto" },
        { width: "512" },
        { format: "webp" },
      ],
    });

    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    //link store to user
    await prisma.user.update({
      where: { id: userId },
      data: {
        storeP: {
          connect: {
            id: newStore.id,
          },
        },
      },
    });
    return NextResponse.json({ message: "Applied!Waiting for approval" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.code || error.message },
      { status: 400 }
    );
  }
}

//check if user already registered a store;if yes send status of store
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    //check if user has already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    //if store is already registered, return status
    if (store) {
      return NextResponse.json({ status: store.status });
    }

    return NextResponse.json({ status: "Not Registered" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.code || error.message },
      { status: 400 }
    );
  }
}
