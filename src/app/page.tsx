"use client";
import UserButton from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/worksapce/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/worksapce/api/use-get-workspaces";
import { Loader } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal(); //global state
  const router = useRouter();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) router.replace(`/workspace/${workspaceId}`);
    else if (!open) setOpen(true);
  }, [workspaceId, isLoading, open, setOpen, router]);
  return (
    <>
      <UserButton />
    </>
  );
}
