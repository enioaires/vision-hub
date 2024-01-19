"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { FC } from "react";

type Props = {
  user: User & { Stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
};

export const StreamPlayer: FC<Props> = ({ user, stream, isFollowing }) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity)
    return <div>You cannot watch this Stream!</div>;
  return <div>Allowed to watch this Stream!</div>;
};
