import { getAuth } from "@clerk/nextjs/server";
import authAdmin from "@/middlewares/authAdmin";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    // const stores = await prisma.store.findMany({
    //   where: {
    //     status: "approved",
    //   },
    //   include: { user: true },
    // });
    const { storeId } = await request.json();
    if (!storeId) {
      return NextResponse.json({ message: "Missing StoreID" }, { status: 400 });
    }

    //Find Store
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }
    await prisma.store.update({
      where: { id: storeId },
      data: { isActive: !store.isActive },
    });

    return NextResponse.json({ message: "Store Udated(Toggle) Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 },
    );
  }
}
