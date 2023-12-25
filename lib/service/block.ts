import { db } from "../db";
import { getSelf } from "./auth";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id }
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) {
    throw new Error("User not found")
  }

  if (otherUser.id === self.id) {
    throw new Error("You cannot block yourself")
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id
      }
    }
  })

  if (existingBlock) {
    throw new Error("You have already blocked this user")
  }

  return await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id
    },
    include: {
      blocked: true
    }
  })
}

export const unblockUser = async (id: string) => {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) {
    throw new Error("User not found")
  }

  if (otherUser.id === self.id) {
    throw new Error("You cannot unblock yourself")
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id
      }
    }
  })

  if (!existingBlock) {
    throw new Error("You have not blocked this user")
  }

  return await db.block.delete({
    where: {
      id: existingBlock.id
    },
    include: {
      blocked: true
    }
  })
}