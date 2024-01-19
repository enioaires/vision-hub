import { Loader } from "lucide-react";
import { FC } from "react";

type Props = {
  label: string;
};

export const LoadingVideo: FC<Props> = ({ label }) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground font-semibold capitalize">{label}</p>
    </div>
  );
};
