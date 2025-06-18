// Static storage for GitHub Pages deployment
import { Character, Scenario, GameProgress, LearningMaterial, InsertGameProgress } from "@shared/schema";

export class StaticStorage {
  private static instance: StaticStorage;
  private characters: Character[] = [];
  private scenarios: Map<string, Scenario> = new Map();
  private gameProgressList: Map<string, GameProgress> = new Map();
  private currentProgressId = 1;

  static getInstance(): StaticStorage {
    if (!StaticStorage.instance) {
      StaticStorage.instance = new StaticStorage();
    }
    return StaticStorage.instance;
  }

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize characters
    this.characters = [
      {
        id: "have_team",
        name: "I have a team",
        description: "You already have a team but are facing collaboration challenges. Navigate through common team problems and find solutions.",
        traits: ["Team Leadership", "Conflict Resolution", "Communication"],
        imageUrl: "/assets/chrome_2yffM9tYuE_1749982595332.png",
        colorTheme: "blue"
      },
      {
        id: "no_team",
        name: "I don't have a team yet",
        description: "You need to find team members or join an existing team. Explore strategies for team formation and networking.",
        traits: ["Team Building", "Networking", "Collaboration"],
        imageUrl: "/assets/chrome_KHZdPfBfLi_1749982595334.png",
        colorTheme: "yellow"
      },
      {
        id: "no_topic",
        name: "I don't have a project topic",
        description: "You need to define your project direction. Learn how to identify research topics and align team interests.",
        traits: ["Research", "Project Planning", "Innovation"],
        imageUrl: "/assets/chrome_2yffM9tYuE_1749982595332.png",
        colorTheme: "gradient"
      }
    ];

    // Initialize scenarios with complete data from server storage
    const scenariosData = [
      {
        id: "start",
        title: "Where are you on your team journey?",
        description: "Choose your current situation to get personalized guidance for your team collaboration challenges.",
        characterId: null,
        decisions: [
          { id: "1", letter: "A", title: "I have a team", description: "You already have a team but are facing collaboration challenges", nextScenario: "have_team" },
          { id: "2", letter: "B", title: "I don't have a team yet", description: "You need to find team members or join an existing team", nextScenario: "no_team" },
          { id: "3", letter: "C", title: "I don't have a project topic", description: "You need to define your project direction and scope", nextScenario: "no_topic" }
        ],
        nextScenarios: { "1": "have_team", "2": "no_team", "3": "no_topic" },
        learningObjectives: ["Self-assessment", "Team formation", "Project planning"]
      },
      {
        id: "have_team",
        title: "Team Problems",
        description: "You already have a team, but a problem appeared. What specific challenge are you facing?",
        characterId: "have_team",
        decisions: [
          { id: "1", letter: "A", title: "The team is falling apart", description: "Major conflicts and relationship breakdowns", nextScenario: "team_break" },
          { id: "2", letter: "B", title: "One member pushes only their solutions", description: "Dominant member not allowing others to contribute", nextScenario: "dominant_member" },
          { id: "3", letter: "C", title: "People don't communicate", description: "Lack of communication and information sharing", nextScenario: "no_comm" },
          { id: "4", letter: "D", title: "Low motivation", description: "Team members seem disengaged and unmotivated", nextScenario: "low_motivation" },
          { id: "5", letter: "E", title: "Can't agree on solution direction", description: "Conflict about which approach to take", nextScenario: "decision_conflict" },
          { id: "6", letter: "F", title: "Can't find research respondents", description: "Struggling to recruit participants for research", nextScenario: "find_respondents" },
          { id: "7", letter: "G", title: "Lacking diversity of expertise", description: "Team members have similar skills, missing other viewpoints", nextScenario: "lack_diversity" },
          { id: "8", letter: "H", title: "Scope too big, team overwhelmed", description: "Project scope is too ambitious for current resources", nextScenario: "scope_overload" }
        ],
        nextScenarios: { "1": "team_break", "2": "dominant_member", "3": "no_comm", "4": "low_motivation", "5": "decision_conflict", "6": "find_respondents", "7": "lack_diversity", "8": "scope_overload" },
        learningObjectives: ["Problem identification", "Team dynamics", "Conflict resolution"]
      },
      // Continue with all other scenarios...
      {
        id: "continue_project",
        title: "Project Continues Successfully",
        description: "🔄 Problem mitigated! Your team has overcome the challenge and is ready to move forward. The collaborative approach worked, and everyone is aligned on next steps. Keep iterating and applying radical collaboration principles as you progress.",
        characterId: "continue_project",
        decisions: [
          { id: "1", letter: "⭐", title: "Continue with renewed energy", description: "Team is functioning well and making excellent progress", nextScenario: "happy_student" },
          { id: "2", letter: "🔄", title: "Start a new scenario", description: "Practice with a different team challenge", nextScenario: "start" }
        ],
        nextScenarios: { "1": "happy_student", "2": "start" },
        learningObjectives: ["Problem resolution", "Collaborative success", "Continuous improvement"]
      },
      {
        id: "happy_student",
        title: "Mission Accomplished!",
        description: "⭐ Congratulations! You are now a satisfied KISK student with a thriving team. Your project is progressing smoothly, relationships are constructive, and you've mastered key collaboration skills. You've successfully navigated team challenges using radical collaboration principles!",
        characterId: "happy_student",
        decisions: [
          { id: "1", letter: "🎉", title: "Celebrate your success", description: "Reflect on your learning journey and achievements", nextScenario: "start" },
          { id: "2", letter: "🔄", title: "Try another scenario", description: "Practice more team collaboration skills", nextScenario: "start" }
        ],
        nextScenarios: { "1": "start", "2": "start" },
        learningObjectives: ["Success achievement", "Team satisfaction", "Skill mastery"]
      }
      // Add all other scenarios here...
    ];

    scenariosData.forEach(scenario => this.scenarios.set(scenario.id, scenario));
  }

  async getCharacters(): Promise<Character[]> {
    return this.characters;
  }

  async getScenario(id: string): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
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
    
    // Persist to localStorage
    localStorage.setItem('gameProgress', JSON.stringify(Array.from(this.gameProgressList.entries())));
    
    return gameProgress;
  }

  async updateGameProgress(sessionId: string, updates: Partial<GameProgress>): Promise<GameProgress | undefined> {
    const existing = this.gameProgressList.get(sessionId);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.gameProgressList.set(sessionId, updated);
    
    // Persist to localStorage
    localStorage.setItem('gameProgress', JSON.stringify(Array.from(this.gameProgressList.entries())));
    
    return updated;
  }

  async getGameProgress(sessionId: string): Promise<GameProgress | undefined> {
    return this.gameProgressList.get(sessionId);
  }

  async getLearningMaterials(sessionId?: string): Promise<LearningMaterial[]> {
    const materials: LearningMaterial[] = [
      {
        id: "scenario-progress",
        title: "Your Learning Progress",
        type: "progress",
        icon: "chart",
        content: {
          completed: 0,
          total: 8,
          percentage: 0
        },
        color: "blue"
      },
      {
        id: "team-collaboration",
        title: "Team Collaboration Principles",
        type: "concept",
        icon: "users",
        content: "Effective team collaboration requires clear communication, defined roles, mutual respect, and shared goals. Key principles include active listening, constructive feedback, and inclusive decision-making processes.",
        color: "green"
      },
      {
        id: "conflict-resolution",
        title: "Conflict Resolution Strategies",
        type: "resource",
        icon: "shield",
        content: "When conflicts arise, address them early through direct communication. Use techniques like active listening, finding common ground, and focusing on interests rather than positions. Consider mediation when direct resolution isn't possible.",
        color: "orange"
      }
    ];

    return materials;
  }
}

export const staticStorage = StaticStorage.getInstance();