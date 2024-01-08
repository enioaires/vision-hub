import { getSelf } from "@/lib/service/auth";
import { getStreamByUserId } from "@/lib/service/stream";
import { FC } from "react";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage: FC = async ({}) => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>

      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isCHatFollowersOnly"
          label="Must be following to chat"
          value={stream.isCHatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
