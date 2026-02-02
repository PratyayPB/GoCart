import prisma from "@/lib/prisma";

const authSeller = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { store: true },
    });

    if (user.store) {
      if (user.store.status === "Approved") {
        if (!user.store.isActive) {
          return false;
        }
        return user.store.id;
      }

      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authSeller;
