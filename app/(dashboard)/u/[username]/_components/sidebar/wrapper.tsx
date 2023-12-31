"use client";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Wrapper: FC<Props> = ({ children }) => {
  const collapsed = useCreatorSidebar((state) => state.collapsed);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
