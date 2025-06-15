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
    // Initialize Characters - Updated to match decision tree
    const charactersData: Character[] = [
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

    charactersData.forEach(char => this.characters.set(char.id, char));

    // Initialize Scenarios - Complete Decision Tree
    const scenariosData: Scenario[] = [
      // Start Node
      {
        id: "start",
        title: "Where are you on your team journey?",
        description: "Choose your current situation to get personalized guidance for your team collaboration challenges.",
        characterId: null,
        decisions: [
          {
            id: "1",
            letter: "A",
            title: "I have a team",
            description: "You already have a team but are facing collaboration challenges",
            nextScenario: "have_team"
          },
          {
            id: "2",
            letter: "B",
            title: "I don't have a team yet",
            description: "You need to find team members or join an existing team",
            nextScenario: "no_team"
          },
          {
            id: "3",
            letter: "C",
            title: "I don't have a project topic",
            description: "You need to define your project direction and scope", 
            nextScenario: "no_topic"
          }
        ],
        nextScenarios: {
          "1": "have_team",
          "2": "no_team",
          "3": "no_topic"
        },
        learningObjectives: ["Self-assessment", "Team formation", "Project planning"]
      },
      
      // Have Team - Problems
      {
        id: "have_team",
        title: "Team Problems",
        description: "The team already exists, but a problem has emerged. What specific challenge are you facing?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "A",
            title: "Team is falling apart",
            description: "Major conflicts and relationship breakdowns",
            nextScenario: "team_break"
          },
          {
            id: "2",
            letter: "B",
            title: "One member pushes only their solutions",
            description: "Dominant member not allowing others to contribute",
            nextScenario: "dominant_member"
          },
          {
            id: "3",
            letter: "C",
            title: "People don't communicate",
            description: "Lack of communication and information sharing",
            nextScenario: "no_comm"
          },
          {
            id: "4",
            letter: "D",
            title: "Low motivation in team",
            description: "Team members seem disengaged and unmotivated",
            nextScenario: "low_motivation"
          },
          {
            id: "5",
            letter: "E",
            title: "Team can't agree on solution direction",
            description: "Conflict about which approach to take",
            nextScenario: "decision_conflict"
          },
          {
            id: "6",
            letter: "F",
            title: "We can't find research respondents",
            description: "Struggling to recruit participants for research",
            nextScenario: "find_respondents"
          }
        ],
        nextScenarios: {
          "1": "team_break",
          "2": "dominant_member", 
          "3": "no_comm",
          "4": "low_motivation",
          "5": "decision_conflict",
          "6": "find_respondents"
        },
        learningObjectives: ["Problem identification", "Team dynamics", "Conflict resolution"]
      },

      // No Team - Finding Team
      {
        id: "no_team",
        title: "Looking for Team",
        description: "You don't have a team yet, but you need to join a project. What's your main challenge?",
        characterId: "no_team",
        decisions: [
          {
            id: "1",
            letter: "A",
            title: "I can't find a team",
            description: "Struggling to find suitable team members or join existing teams",
            nextScenario: "find_team"
          },
          {
            id: "2",
            letter: "B",
            title: "I can't find the right topic",
            description: "Need help defining project direction",
            nextScenario: "no_topic"
          }
        ],
        nextScenarios: {
          "1": "find_team",
          "2": "no_topic"
        },
        learningObjectives: ["Team formation", "Networking", "Project alignment"]
      },

      // Dominant Member Solutions
      {
        id: "dominant_member",
        title: "Handling Dominant Team Member",
        description: "One member dominates speaking; others don't have space. (Online meeting in Teams)",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Time-boxed round-robin principle",
            description: "Everyone gets max 2 min reaction time",
            nextScenario: "round_robin_start"
          },
          {
            id: "2",
            letter: "🏃",
            title: "Launch 1-2-4-All online",
            description: "Teams Breakout Rooms: 1 min thinking → 2 min pairs → 4 min groups → 5 min summary",
            nextScenario: "124_all_online"
          },
          {
            id: "3",
            letter: "🛠",
            title: "Turn on Talk-Time Tracker",
            description: "Teams/Zoom add-on to review speaking patterns together",
            nextScenario: "talk_time_reflect"
          },
          {
            id: "4",
            letter: "⚠️",
            title: "Use Parking Lot technique",
            description: "Move dominant member's topics to Parking Lot with 1-on-1 feedback",
            nextScenario: "parking_lot_feedback"
          }
        ],
        nextScenarios: {
          "1": "round_robin_start",
          "2": "124_all_online",
          "3": "talk_time_reflect",
          "4": "parking_lot_feedback"
        },
        learningObjectives: ["Meeting facilitation", "Inclusive participation", "Communication balance"]
      },

      // Decision Conflict Solutions
      {
        id: "decision_conflict",
        title: "Decision Making Conflict",
        description: "Team can't agree on which direction to take when solving the problem.",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🛠",
            title: "Create Decision Matrix",
            description: "Set up criteria and weights for evaluation",
            nextScenario: "decision_matrix"
          },
          {
            id: "2",
            letter: "🏃",
            title: "Perform Dot Voting",
            description: "Use dot voting to narrow down options democratically",
            nextScenario: "dot_vote"
          },
          {
            id: "3",
            letter: "🔍",
            title: "Test 1-day prototype spike",
            description: "Create quick prototypes for top 2 solutions",
            nextScenario: "prototype_spike"
          },
          {
            id: "4",
            letter: "⭐",
            title: "Agreement reached",
            description: "Team has found consensus",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "decision_matrix",
          "2": "dot_vote",
          "3": "prototype_spike",
          "4": "continue_project"
        },
        learningObjectives: ["Decision making", "Consensus building", "Conflict resolution"]
      },

      // Find Team Strategies
      {
        id: "find_team",
        title: "Team Finding Strategies",
        description: "You don't have a stable team yet. Choose your approach:",
        characterId: "no_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Create skill profile",
            description: "Create skill profile and share in course chat",
            nextScenario: "profile_share"
          },
          {
            id: "2",
            letter: "🏃",
            title: "Join as guest researcher",
            description: "Join existing team as 'guest researcher' for one sprint",
            nextScenario: "guest_join"
          },
          {
            id: "3",
            letter: "🛠",
            title: "Create job posting",
            description: "Create job posting with spider chart of abilities",
            nextScenario: "recruit_own"
          }
        ],
        nextScenarios: {
          "1": "profile_share",
          "2": "guest_join",
          "3": "recruit_own"
        },
        learningObjectives: ["Networking", "Team formation", "Skill assessment"]
      },

      // Success Paths
      {
        id: "continue_project",
        title: "Success",
        description: "Problem mitigated, team continues work. Continue iterating and apply further principles of radical collaboration.",
        characterId: null,
        decisions: [
          {
            id: "1",
            letter: "⭐",
            title: "Continue with project",
            description: "Team is functioning well and making progress",
            nextScenario: "happy_student"
          }
        ],
        nextScenarios: {
          "1": "happy_student"
        },
        learningObjectives: ["Success reinforcement", "Continuous improvement"]
      },

      {
        id: "happy_student",
        title: "Happy Student",
        description: "Satisfied KISK student – team functions, project progresses and relationships are constructive. ⭐",
        characterId: null,
        decisions: [],
        nextScenarios: {},
        learningObjectives: ["Success achievement", "Team satisfaction"]
      },

      // Missing scenario nodes
      {
        id: "no_comm",
        title: "Communication Issues",
        description: "Team members aren't sharing information effectively. How do you improve communication?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🛠",
            title: "Set up regular check-ins",
            description: "Schedule daily stand-ups and weekly team meetings",
            nextScenario: "continue_project"
          },
          {
            id: "2",
            letter: "🔍",
            title: "Create communication charter",
            description: "Define how and when team communicates",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project",
          "2": "continue_project"
        },
        learningObjectives: ["Communication protocols", "Team alignment"]
      },

      {
        id: "round_robin_start",
        title: "Round-Robin Success",
        description: "Time-boxed speaking worked! Everyone contributed equally to the discussion. ⭐",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "⭐",
            title: "Continue with structured discussions",
            description: "Team has learned effective meeting facilitation",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project"
        },
        learningObjectives: ["Meeting facilitation", "Equal participation"]
      },

      {
        id: "talk_time_reflect",
        title: "Talk-Time Insights",
        description: "The speaking patterns visualization helped the team see the imbalance. Now everyone is more aware. ⭐",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "⭐",
            title: "Continue using data-driven insights",
            description: "Team commits to regular speaking pattern reviews",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project"
        },
        learningObjectives: ["Data-driven awareness", "Self-monitoring"]
      },

      {
        id: "parking_lot_feedback",
        title: "Parking Lot Strategy",
        description: "Moving topics to a parking lot and giving private feedback helped manage the dominant behavior. ⭐",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "⭐",
            title: "Establish meeting facilitation protocol",
            description: "Team agrees on structured meeting management",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project"
        },
        learningObjectives: ["Conflict management", "Private feedback techniques"]
      },

      {
        id: "124_all_online",
        title: "1-2-4-All Success",
        description: "The structured breakout approach gave everyone a voice and generated better ideas. ⭐",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "⭐",
            title: "Adopt structured ideation methods",
            description: "Team learns effective online collaboration techniques",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project"
        },
        learningObjectives: ["Structured collaboration", "Online facilitation"]
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
        id: "team-finding-resources",
        title: "Team Finding Resources",
        type: "resource",
        icon: "users",
        content: [
          { title: "CliftonStrengths Assessment", url: "https://www.gallup.com/cliftonstrengths" },
          { title: "VIA Character Strengths", url: "https://www.viacharacter.org" },
          { title: "16Personalities (MBTI)", url: "https://www.16personalities.com" },
          { title: "Spider-chart template (Miro)", url: "https://miro.com/templates/radar-chart" }
        ],
        color: "yellow"
      },
      {
        id: "facilitation-tools",
        title: "Meeting Facilitation Tools",
        type: "resource",
        icon: "lightbulb",
        content: [
          { title: "Round-Robin facilitation tip-sheet", url: "https://www.sessionlab.com/library/roundrobin" },
          { title: "Liberating Structures 1-2-4-All", url: "http://www.liberatingstructures.com/1-1-2-4-all" },
          { title: "Parabol Talk-Time Tracker", url: "https://www.parabol.co/integration/teams" },
          { title: "Handling dominant speakers", url: "https://hbr.org/2020/08/how-to-handle-dominant-speakers-in-virtual-meetings" }
        ],
        color: "blue"
      },
      {
        id: "decision-making-tools",
        title: "Decision Making Tools",
        type: "resource",
        icon: "chart-line",
        content: [
          { title: "Decision Matrix Guide", url: "https://www.lucidchart.com/blog/decision-matrix-template" },
          { title: "Dot Voting Guide (IDEO)", url: "https://www.designkit.org/methods/dot-voting" },
          { title: "Prototyping Spike explainer", url: "https://martinfowler.com/bliki/Spike.html" }
        ],
        color: "green"
      },
      {
        id: "project-management",
        title: "Project Management",
        type: "resource",
        icon: "download",
        content: [
          { title: "Sprint Goal Canvas", url: "https://www.mural.co/templates/sprint-goal-canvas" },
          { title: "Team Charter Jam (Figma)", url: "https://figma.com/community/file/Team-Charter-Jam" },
          { title: "MoSCoW Prioritization", url: "https://agilebusiness.org/resources/moscow-prioritisation" },
          { title: "Scope Canvas template", url: "https://scopecanvas.com" }
        ],
        color: "purple"
      },
      {
        id: "progress",
        title: "Your Progress",
        type: "progress",
        icon: "chart-line",
        content: {
          completed: 0,
          total: 15,
          percentage: 0
        },
        color: "green"
      }
    ];
  }
}

export const storage = new MemStorage();
