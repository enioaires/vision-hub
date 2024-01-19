"use client";

import { Hint } from "@/components/hint";
import { Maximize, Minimize } from "lucide-react";
import { FC } from "react";

type Props = {
  isFullscreen: boolean;
  onToggle: () => void;
};

export const FullscreenControl: FC<Props> = ({ isFullscreen, onToggle }) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
