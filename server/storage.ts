import { 
  characters, 
  scenarios, 
  gameProgress,
  type Character, 
  type Scenario, 
  type GameProgress,
  type InsertCharacter,
  type InsertScenario,
  type InsertGameProgress,
  type Decision,
  type LearningMaterial
} from "@shared/schema";

export interface IStorage {
  getCharacters(): Promise<Character[]>;
  getCharacter(id: string): Promise<Character | undefined>;
  getScenario(id: string): Promise<Scenario | undefined>;
  getScenariosByCharacter(characterId: string): Promise<Scenario[]>;
  createGameProgress(progress: InsertGameProgress): Promise<GameProgress>;
  updateGameProgress(sessionId: string, updates: Partial<GameProgress>): Promise<GameProgress | undefined>;
  getGameProgress(sessionId: string): Promise<GameProgress | undefined>;
  getLearningMaterials(): Promise<LearningMaterial[]>;
}

export class MemStorage implements IStorage {
  private characters: Map<string, Character> = new Map();
  private scenarios: Map<string, Scenario> = new Map();
  private gameProgressList: Map<string, GameProgress> = new Map();
  private currentProgressId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize Characters
    const charactersData: Character[] = [
      {
        id: "facilitator",
        name: "The Facilitator",
        description: "Natural leader who guides team discussions and ensures everyone's voice is heard. Excels at conflict resolution and maintaining group focus.",
        traits: ["Leadership", "Communication", "Empathy"],
        imageUrl: "/assets/chrome_2yffM9tYuE_1749982595332.png",
        colorTheme: "blue"
      },
      {
        id: "analyzer",
        name: "The Analyzer",
        description: "Detail-oriented problem solver who breaks down complex issues and provides data-driven insights. Skilled at identifying potential risks and opportunities.",
        traits: ["Analysis", "Problem Solving", "Research"],
        imageUrl: "/assets/chrome_KHZdPfBfLi_1749982595334.png",
        colorTheme: "yellow"
      },
      {
        id: "creator",
        name: "The Creator",
        description: "Innovative thinker who brings fresh perspectives and creative solutions. Thrives on brainstorming and turning ideas into actionable plans.",
        traits: ["Creativity", "Innovation", "Vision"],
        imageUrl: "/assets/chrome_2yffM9tYuE_1749982595332.png",
        colorTheme: "gradient"
      }
    ];

    charactersData.forEach(char => this.characters.set(char.id, char));

    // Initialize Scenarios
    const scenariosData: Scenario[] = [
      {
        id: "team-conflict-1",
        title: "Team Collaboration Challenge",
        description: "Your team is working on a critical project with tight deadlines. How do you handle conflicting opinions and ensure everyone stays engaged?",
        characterId: null,
        decisions: [
          {
            id: "1",
            letter: "A",
            title: "Schedule individual meetings with each team member",
            description: "Address concerns privately to avoid public conflict",
            nextScenario: "resolution-private"
          },
          {
            id: "2", 
            letter: "B",
            title: "Facilitate an open team discussion",
            description: "Encourage transparent communication and collaborative problem-solving",
            nextScenario: "resolution-open"
          },
          {
            id: "3",
            letter: "C", 
            title: "Research best practices and present solutions",
            description: "Gather data and evidence to support your recommendations",
            nextScenario: "resolution-research"
          }
        ],
        nextScenarios: {
          "1": "resolution-private",
          "2": "resolution-open", 
          "3": "resolution-research"
        },
        learningObjectives: ["Active listening", "Conflict resolution", "Team dynamics"]
      },
      {
        id: "resolution-private",
        title: "Private Consultation Results",
        description: "After meeting with team members individually, you've gathered everyone's concerns. How do you proceed to address the issues collectively?",
        characterId: null,
        decisions: [
          {
            id: "1",
            letter: "A",
            title: "Create an anonymous feedback system",
            description: "Allow team members to share concerns without direct confrontation"
          },
          {
            id: "2",
            letter: "B", 
            title: "Present a unified solution to the team",
            description: "Synthesize the feedback into actionable next steps"
          },
          {
            id: "3",
            letter: "C",
            title: "Schedule a follow-up team meeting",
            description: "Bring everyone together with the insights you've gathered"
          }
        ],
        nextScenarios: {},
        learningObjectives: ["Information synthesis", "Follow-through", "Team communication"]
      }
    ];

    scenariosData.forEach(scenario => this.scenarios.set(scenario.id, scenario));
  }

  async getCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }

  async getCharacter(id: string): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async getScenario(id: string): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async getScenariosByCharacter(characterId: string): Promise<Scenario[]> {
    return Array.from(this.scenarios.values()).filter(
      scenario => scenario.characterId === characterId || scenario.characterId === null
    );
  }

  async createGameProgress(progress: InsertGameProgress): Promise<GameProgress> {
    const id = this.currentProgressId++;
    const gameProgress: GameProgress = { 
      ...progress, 
      id,
      selectedCharacter: progress.selectedCharacter || null,
      currentScenario: progress.currentScenario || null,
      completedScenarios: progress.completedScenarios || [],
      decisions: progress.decisions || {}
    };
    this.gameProgressList.set(progress.sessionId, gameProgress);
    return gameProgress;
  }

  async updateGameProgress(sessionId: string, updates: Partial<GameProgress>): Promise<GameProgress | undefined> {
    const existing = this.gameProgressList.get(sessionId);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.gameProgressList.set(sessionId, updated);
    return updated;
  }

  async getGameProgress(sessionId: string): Promise<GameProgress | undefined> {
    return this.gameProgressList.get(sessionId);
  }

  async getLearningMaterials(): Promise<LearningMaterial[]> {
    return [
      {
        id: "key-concepts",
        title: "Key Concepts",
        type: "concept",
        icon: "lightbulb",
        content: [
          "Active listening techniques",
          "Conflict resolution strategies", 
          "Remote team engagement",
          "Decision-making frameworks"
        ],
        color: "yellow"
      },
      {
        id: "team-dynamics",
        title: "Team Dynamics", 
        type: "concept",
        icon: "users",
        content: "Understanding different personality types and communication styles is crucial for effective online collaboration.",
        color: "blue"
      },
      {
        id: "progress",
        title: "Progress Tracking",
        type: "progress",
        icon: "chart-line",
        content: {
          completed: 0,
          total: 12,
          percentage: 0
        },
        color: "green"
      },
      {
        id: "resources",
        title: "Resources",
        type: "download",
        icon: "download",
        content: [
          { title: "📊 Team Assessment Tool", url: "#" },
          { title: "📝 Communication Guidelines", url: "#" },
          { title: "🎯 Goal Setting Template", url: "#" }
        ],
        color: "purple"
      }
    ];
  }
}

export const storage = new MemStorage();
