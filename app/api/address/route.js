import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
//Add new address
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {  
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: "",
        email: "",
        image: "",
      },
    });


    const { address } = await request.json();
    address.userId = userId;

    // Check if identical address already exists
    const existingAddress = await prisma.address.findFirst({
      where: {
        userId,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },
    });

    if (existingAddress) {
      return NextResponse.json(
        { error: "This address already exists" },
        { status: 400 },
      );
    }

    const newAddress = await prisma.address.create({
      data: {
        ...address,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        newAddress,
        message: "Address Added Successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.code || error.message });
  }
}

//Get all addresses for a user

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    return NextResponse.json({
      addresses,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.code || error.message });
  }
}
