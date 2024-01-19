import { WifiOff } from "lucide-react";
import { FC } from "react";

type Props = {
  username: string;
};

export const OfflineVideo: FC<Props> = ({ username }) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground font-semibold">
        <span>{username} is Offline</span>
      </p>
    </div>
  );
};
