import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({
    where: {
      username,
    },
    include: {
      Stream: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
    include: {
      Stream: true,
    },
  });
};
