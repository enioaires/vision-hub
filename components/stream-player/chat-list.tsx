"use client";
import { ReceivedChatMessage } from "@livekit/components-react";
import { FC } from "react";
import { ChatMessage } from "./chat-message";

type Props = {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};

export const ChatList: FC<Props> = ({ messages, isHidden }) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "No messages yet"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};
