import { ApiResponse } from "../types/api-response";
import { Topic } from "../types/topic";

import { apiHelpers } from "./api";

export const topicApi = {
  getTopics: async (): Promise<ApiResponse<Topic[]>> => {
    return apiHelpers.get("/topik");
  },

  getTopicById: async (id: number): Promise<ApiResponse<Topic>> => {
    return apiHelpers.get(`/topik/${id}`);
  },

  deleteTopic: async (id?: number): Promise<ApiResponse<null>> => {
    return apiHelpers.delete(`/topik/${id}`);
  },

  createTopic: async (
    topic: Omit<Topic, "id">
  ): Promise<ApiResponse<Topic>> => {
    return apiHelpers.post("/topik", topic);
  },
};

export default topicApi;
