import { db } from "@/lib/db";
import { getSelf } from "@/lib/service/auth";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        Stream: true,
      },
    });
  } else {
    users = await db.user.findMany({
      include: { Stream: true },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
