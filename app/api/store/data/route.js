//Get store info and store products
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export default async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username").toLowerCase();
    if (!username) {
      return NextResponse.json(
        { message: "Missing username" },
        { status: 400 }
      );
    }
    //Store info and instock products with rating
    const store = await prisma.store.findUnique({
      where: { username, isActive: true },
      include: { Product: { include: { rating: true } } },
    });

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }
    return NextResponse.json({ store });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
