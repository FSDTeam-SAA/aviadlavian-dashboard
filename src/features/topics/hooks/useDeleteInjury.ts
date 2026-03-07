import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInjury } from "../api/injury.api";
import { toast } from "sonner";

export const useDeleteInjury = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInjury(id),
    onSuccess: () => {
      // Invalidate and refetch injuries list
      queryClient.invalidateQueries({ queryKey: ["injuries"] });

      console.log("Topic deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete topic:", error);
      toast.error(error.message || "Failed to delete topic");
    },
  });
};
