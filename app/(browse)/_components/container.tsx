"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { FC, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
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
      className={cn("flex-1", collapsed ? "ml-[80px]" : "ml-[80px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
