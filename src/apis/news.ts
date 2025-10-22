import { handleApiError } from "@/lib/utils";
import { hackerNewsAPI } from "./api-client";
import type { StoryDetail } from "@/types/news";

export const getTopStories = async (): Promise<number[]> => {
  try {
    const response = await hackerNewsAPI.get("topstories.json");
    return response.data;
  } catch (error) {
    handleApiError(error, "An error occurred while fetching top stories.");
  }
};

export const getStoryDetail = async (id: number): Promise<StoryDetail> => {
  try {
    const response = await hackerNewsAPI.get(`item/${id}.json`);
    return response.data;
  } catch (error) {
    handleApiError(error, "An error occurred while fetching story.");
  }
};
