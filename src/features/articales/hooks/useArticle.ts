import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/get-article.api";

export const useArticle = (id: string | null) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id!),
    enabled: !!id,
  });
};
