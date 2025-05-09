import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspacesInfoProps {
  id: Id<"workspace">;
}

export const useGetWorkspaceInfo = ({ id }: useGetWorkspacesInfoProps) => {
  const data = useQuery(api.workspaces.getInfoByID, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
