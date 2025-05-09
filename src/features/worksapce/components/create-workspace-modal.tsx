import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = ({}) => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");
  const router = useRouter();

  const { mutate, data, error, isError, isPending, isSettled, isSuccess } =
    useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    setName("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess(id) {
          router.push(`/workspace/${id}`);
          handleClose();
          toast.success("Workspace created!");
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={handleClose} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a worksapce</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g.`Work`,`Personal`,`Home`"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
