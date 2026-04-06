import { HackathonsService } from "@/services/hackathonsService";
import { useQuery } from "@tanstack/react-query";

const baseOptions = {
  retry: false,
  staleTime: 30_000,
  refetchOnWindowFocus: false,
};

export const hackathonsQueryKeys = {
  all: ["hackathons"] as const,
  catalog: () => [...hackathonsQueryKeys.all, "catalog"] as const,
};

export const useHackathonsCatalog = () =>
  useQuery({
    queryKey: hackathonsQueryKeys.catalog(),
    queryFn: HackathonsService.getCatalog,
    ...baseOptions,
  });
