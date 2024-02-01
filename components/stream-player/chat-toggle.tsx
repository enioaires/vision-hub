"use client";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { FC } from "react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

export const ChatToggle: FC = ({}) => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => ({
    collapsed: state.collapsed,
    onExpand: state.onExpand,
    onCollapse: state.onCollapse,
  }));

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} asChild side="left">
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
