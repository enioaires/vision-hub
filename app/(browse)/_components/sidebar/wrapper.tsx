"use client";
import { FC } from "react";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export const Wrapper: FC<Props> = ({ children }) => {
  const collapsed = useSidebar((state) => state.collapsed);

  return (
    <aside
      className={cn(
        "fixed lef-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-20"
      )}
    >
      {children}
    </aside>
  );
};
