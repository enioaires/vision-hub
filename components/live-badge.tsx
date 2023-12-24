import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = {
  className?: string;
};

export const LiveBadge: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-0.5 px-1.5 rounded-md text-[10px] border border-background uppercase font-semibold tracking-wide",
        className
      )}
    >
      Live
    </div>
  );
};
