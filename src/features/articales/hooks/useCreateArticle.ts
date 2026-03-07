import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle, CreateArticlePayload } from "../api/create-article.api";
import { toast } from "sonner";

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateArticlePayload) => createArticle(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article created successfully!");
      console.log("Article created successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Failed to create article:", error);
      toast.error(error.message || "Failed to create article");
    },
  });
};
