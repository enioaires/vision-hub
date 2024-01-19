import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/service/user";
import { currentUser } from "@clerk/nextjs";
import { FC } from "react";

type Props = {
  params: {
    username: string;
  };
};

const CreatorPage: FC<Props> = async ({ params: { username } }) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.Stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.Stream} isFollowing />
    </div>
  );
};
export default CreatorPage;
