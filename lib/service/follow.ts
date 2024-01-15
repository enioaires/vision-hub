import { db } from "@/lib/db";
import { getSelf } from "@/lib/service/auth";

export const getFollowers = async () => {
  try {
    const self = await getSelf();

    return db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            Stream: true,
          },
        },
      },
    });
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) {
      return true;
    }

    const following = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!following;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found");

  if (otherUser.id === self.id) {
    throw new Error("You cannot follow yourself");
  }

  const following = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (following) throw new Error("You are already following this user");

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found");

  if (otherUser.id === self.id) {
    throw new Error("You cannot unfollow yourself");
  }

  const following = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!following) throw new Error("You are not following this user");

  return await db.follow.delete({
    where: {
      id: following.id,
    },
    include: {
      following: true,
    },
  });
};
