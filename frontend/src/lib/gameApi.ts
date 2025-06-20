import { apiRequest } from "./queryClient";
import { Character, Scenario, GameProgress, LearningMaterial } from "@shared/schema";

export const gameApi = {
  getCharacters: async (): Promise<Character[]> => {
    const res = await apiRequest("GET", "/api/characters");
    return res.json();
  },

  getCharacter: async (id: string): Promise<Character> => {
    const res = await apiRequest("GET", `/api/characters/${id}`);
    return res.json();
  },

  getScenario: async (id: string): Promise<Scenario> => {
    const res = await apiRequest("GET", `/api/scenarios/${id}`);
    return res.json();
  },

  getCharacterScenarios: async (characterId: string): Promise<Scenario[]> => {
    const res = await apiRequest("GET", `/api/characters/${characterId}/scenarios`);
    return res.json();
  },

  createGameProgress: async (data: { sessionId: string; selectedCharacter?: string }): Promise<GameProgress> => {
    const res = await apiRequest("POST", "/api/game-progress", data);
    return res.json();
  },

  updateGameProgress: async (sessionId: string, updates: Partial<GameProgress>): Promise<GameProgress> => {
    const res = await apiRequest("PATCH", `/api/game-progress/${sessionId}`, updates);
    return res.json();
  },

  getGameProgress: async (sessionId: string): Promise<GameProgress> => {
    const res = await apiRequest("GET", `/api/game-progress/${sessionId}`);
    return res.json();
  },

  getLearningMaterials: async (sessionId?: string): Promise<LearningMaterial[]> => {
    const url = sessionId ? `/api/learning-materials?sessionId=${sessionId}` : "/api/learning-materials";
    const res = await apiRequest("GET", url);
    return res.json();
  }
};
