import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type Props = VariantProps<typeof avatarSizes> & {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
};

export const UserAvatar: FC<Props> = ({
  imageUrl,
  username,
  isLive = false,
  showBadge = false,
  size = "default",
}) => {
  const canShowBadge = isLive && showBadge;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes> & {};

export const UserAvatarSkeleton: FC<UserAvatarSkeletonProps> = ({ size }) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
