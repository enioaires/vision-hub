"use client";
import { cn } from "@/lib/utils";
import { FC, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
