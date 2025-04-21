import { ApiResponse } from "../types/api-response";
import { Topic } from "../types/topic";

import api from "./api";

export const topicApi = {
  getTopics: async (): Promise<ApiResponse<Topic[]>> => {
    const response = await api.get("/topik");
    return response.data;
  },

  getTopicById: async (id: number): Promise<ApiResponse<Topic>> => {
    const response = await api.get(`/topik/${id}`);
    return response.data;
  },

  deleteTopic: async (id?: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/topik/${id}`);
    return response.data;
  },

  createTopic: async (
    topic: Omit<Topic, "id">
  ): Promise<ApiResponse<Topic>> => {
    const response = await api.post("/topik", topic);
    return response.data;
  },
};

export default topicApi;
