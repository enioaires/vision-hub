import { isFollowingUser } from "@/lib/service/follow";
import { getUserByUsername } from "@/lib/service/user";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Actions } from "./_components/actions";

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

  return (
    <div className="flex flex-col gap-y-4">
      <p>User: {user.username}</p>
      <p>Id: {user.id}</p>
      <p>Is following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};
export default UserPage;
