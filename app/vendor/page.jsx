import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function VendorPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email =
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress;

  if (email) {
    // Check if user has a record in Store table with the same email (or matching userId)
    const store = await prisma.store.findFirst({
      where: {
        OR: [
          { email: email },
          { userId: user.id },
        ],
      },
    });

    if (store) {
      redirect("/store");
    }
  }

  redirect("/create-store");
}
