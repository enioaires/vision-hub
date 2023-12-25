"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { FC } from "react";
import { UserItem, UserItemSkeleton } from "./user-item";

type Props = {
  data: (Follow & { following: User })[];
};

export const Following: FC<Props> = ({ data }) => {
  const collapsed = useSidebar((state) => state.collapsed);

  console.log(data);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.following.id}
            username={user.following.username}
            imageUrl={user.following.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton: FC = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(5)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
