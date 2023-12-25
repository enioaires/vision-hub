"use client";
import { FC, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock, onUnblock } from "@/actions/block";
import { toast } from "sonner";

type Props = {
  isFollowing: boolean;
  userId: string;
};

export const Actions: FC<Props> = ({ isFollowing, userId }) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}!`);
        })
        .catch(() => {
          toast.error("Failed to follow!");
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(
            `You are no longer following ${data.following.username}!`
          );
        })
        .catch(() => {
          toast.error("Failed to unfollow!");
        });
    });
  };

  const onClickFollow = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          toast.success(`You have blocked ${data?.blocked.username}!`);
        })
        .catch(() => {
          toast.error("Failed to block!");
        });
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => {
          toast.success(`You have unblocked ${data.blocked.username}!`);
        })
        .catch(() => {
          toast.error("Failed to unblock!");
        });
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClickFollow} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={handleBlock} variant="destructive">
        Block
      </Button>
    </>
  );
};
