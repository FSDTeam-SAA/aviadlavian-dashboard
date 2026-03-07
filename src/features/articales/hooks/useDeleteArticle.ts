import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "../api/article.api";
import { toast } from "sonner";

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      console.log("Article deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete article:", error);
      toast.error(error.message || "Failed to delete article");
    },
  });
};
