"use client";
import { FC, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isCHatFollowersOnly";

type Props = {
  field: FieldTypes;
  label: string;
  value: boolean;
};

export const ToggleCard: FC<Props> = ({ field, label, value = false }) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success("Chat settings updated");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton: FC = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
