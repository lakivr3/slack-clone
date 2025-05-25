"use client";

import { useCreateOrGetConverstation } from "@/features/conversations/use-create-or-get-conversation.tsx";
import { useMemberlId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Conversation } from "./conversation";
const MemberIdPage = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberlId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConverstation();

  useEffect(() => {
    mutate(
      {
        workspaceId,
        memberId,
      },
      {
        onSuccess(data) {
          setConversationId(data);
        },
      }
    );
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>;
  }
  if (!conversationId) {
    return (
      <div className="h-full  flex flex-col items-center justify-center  gap-y-2">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation not found
        </span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
