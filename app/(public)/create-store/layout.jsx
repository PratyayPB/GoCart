import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRightIcon, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CreateStoreLayout({ children }) {
  const user = await currentUser();

  if (user) {
    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress;

    // Check if user already has a store by email or userId
    const existingStore = await prisma.store.findFirst({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          { userId: user.id },
        ],
      },
    });

    if (existingStore) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 my-16">
          <div className="flex flex-col items-center max-w-lg bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl shadow-sm">
            <ShieldAlert className="w-14 h-14 text-red-500 mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Unauthorized
            </h1>
            <p className="text-slate-600 mb-2 font-medium">
              You already have a store.
            </p>
            <p className="text-slate-500 text-sm mb-6 max-w-sm">
              You cannot create a new store because a store is already associated with your account ({existingStore.name || email}).
            </p>
            <Link
              href="/store"
              className="bg-slate-800 text-white flex items-center gap-2 py-2.5 px-6 rounded-full hover:bg-slate-900 transition text-sm font-medium"
            >
              Go to your store <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
