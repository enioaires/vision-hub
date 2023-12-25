"use client";
import { FC, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

type Props = {
  isFollowing: boolean;
  userId: string;
};

export const Actions: FC<Props> = ({ isFollowing, userId }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      if (isFollowing) {
        onUnfollow(userId)
          .then((data) => {
            toast.success(
              `You are no longer following ${data.following.username}!`
            );
          })
          .catch(() => {
            toast.error("Failed to unfollow!");
          });
      } else {
        onFollow(userId)
          .then((data) => {
            toast.success(`You are now following ${data.following.username}!`);
          })
          .catch(() => {
            toast.error("Failed to follow!");
          });
      }
    });
  };
  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
