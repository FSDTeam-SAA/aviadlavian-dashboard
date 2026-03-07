import { useQuery } from "@tanstack/react-query";
import { getInjury } from "../api/get-injury.api";

export const useInjury = (id: string | null) => {
  return useQuery({
    queryKey: ["injury", id],
    queryFn: () => getInjury(id!),
    enabled: !!id, // Only run query if id is provided
  });
};
