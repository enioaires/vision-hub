import { FC } from "react";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isFollowingUser } from "@/lib/service/follow";
import { getUserByUsername } from "@/lib/service/user";
import { isBlockedByUser } from "@/lib/service/block";

type Props = {
  params: {
    username: string;
  };
};

const UserPage: FC<Props> = async ({ params: { username } }) => {
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>User: {user.username}</p>
      <p>Id: {user.id}</p>
      <p>Is following this user: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};
export default UserPage;
