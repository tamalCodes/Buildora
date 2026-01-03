import { useQuery } from '@tanstack/react-query';
import { ProfileService } from '../../../services/profileService';

const baseOptions = {
  retry: false,
  staleTime: 0,
  gcTime: 0,
  refetchOnWindowFocus: false,
};

export const useProfileSummary = () =>
  useQuery({
    queryKey: ['profile', 'summary'],
    queryFn: () => ProfileService.getSummary(),
    ...baseOptions,
  });

export const useProfileMe = () =>
  useQuery({
    queryKey: ['profile', 'me'],
    queryFn: () => ProfileService.getMe(),
    ...baseOptions,
  });
