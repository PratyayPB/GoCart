import { getAuth } from "@clerk/nextjs/server";
import authAdmin from "@/middlewares/authAdmin";
import { NextResponse } from "next/server";

//Auth Admin
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 400 });
    }

    return NextResponse.json({ isAdmin });
  } catch (error) {
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}
