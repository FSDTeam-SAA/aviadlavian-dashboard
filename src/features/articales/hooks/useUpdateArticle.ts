import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle, UpdateArticlePayload } from "../api/update-article.api";
import { toast } from "sonner";

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateArticlePayload;
    }) => updateArticle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
      toast.success("Article updated successfully!");
    },
    onError: (error: unknown) => {
      console.error("Update mutation error:", error);

      const apiError = error as {
        response?: {
          data?: {
            data?: Array<{
              field?: string;
              message?: string;
            }>;
            message?: string;
          };
        };
      };

      const validationErrors = apiError.response?.data?.data;

      if (validationErrors && validationErrors.length > 0) {
        const errorMessages = validationErrors
          .map(
            (err) =>
              `${err.field || "field"}: ${err.message || "Invalid value"}`,
          )
          .join(", ");
        toast.error(`Validation failed: ${errorMessages}`);
        return;
      }

      toast.error(
        apiError.response?.data?.message || "Failed to update article",
      );
    },
  });
};
