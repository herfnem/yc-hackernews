import { getStoryDetail, getTopStories } from "@/apis/news";
import type { StoryDetail } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

export const useGetTopStories = () =>
  useQuery<number[], Error>({
    queryKey: ["top_stories"],
    queryFn: () => getTopStories(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

export const useGetStoryDetail = (id: number) =>
  useQuery<StoryDetail, Error>({
    queryKey: ["story", id],
    queryFn: () => getStoryDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

// export const useCreateYachtCrew = () =>
//   useMutation<
//     ResultResponse<CreateYachtCrewResponse>,
//     Error,
//     CreateYachtCrewPayload
//   >({
//     mutationFn: (payload) => createYachtCrew(payload),
//   });
