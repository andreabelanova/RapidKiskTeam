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
  getLearningMaterials(sessionId?: string): Promise<LearningMaterial[]>;
  getTotalScenarioCount(): Promise<number>;
  getVisitedScenariosCount(sessionId: string): Promise<number>;
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

    // Initialize Scenarios - Complete Decision Tree (v0.2)
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
      
      // Have Team - Problems (Updated v0.2)
      {
        id: "have_team",
        title: "Team Problems",
        description: "You already have a team, but a problem appeared. What specific challenge are you facing?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "A",
            title: "The team is falling apart",
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
            title: "Low motivation",
            description: "Team members seem disengaged and unmotivated",
            nextScenario: "low_motivation"
          },
          {
            id: "5",
            letter: "E",
            title: "Can't agree on solution direction",
            description: "Conflict about which approach to take",
            nextScenario: "decision_conflict"
          },
          {
            id: "6",
            letter: "F",
            title: "Can't find research respondents",
            description: "Struggling to recruit participants for research",
            nextScenario: "find_respondents"
          },
          {
            id: "7",
            letter: "G",
            title: "Lacking diversity of expertise",
            description: "Team members have similar skills, missing other viewpoints",
            nextScenario: "lack_diversity"
          },
          {
            id: "8",
            letter: "H",
            title: "Scope too big, team overwhelmed",
            description: "Project scope is too ambitious for current resources",
            nextScenario: "scope_overload"
          }
        ],
        nextScenarios: {
          "1": "team_break",
          "2": "dominant_member", 
          "3": "no_comm",
          "4": "low_motivation",
          "5": "decision_conflict",
          "6": "find_respondents",
          "7": "lack_diversity",
          "8": "scope_overload"
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

      // No Topic - Topic Development (v0.2)
      {
        id: "no_topic",
        title: "Topic Development",
        description: "You don't have a clear topic/problem for your (future) team. How do you want to discover your project focus?",
        characterId: "no_topic",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Personal brainstorm",
            description: "Do a quick personal brainstorm – list 3–5 problems that annoy or fascinate you",
            nextScenario: "topic_self_reflect"
          },
          {
            id: "2",
            letter: "🤝",
            title: "Ideation call",
            description: "Host a 30‑min ideation call with 2–3 classmates, generate ideas and vote TOP 3",
            nextScenario: "topic_ideation_call"
          },
          {
            id: "3",
            letter: "🛠️",
            title: "Browse challenge library",
            description: "Browse a challenge library (UN SDGs, 100 methods DB) and pick what resonates",
            nextScenario: "topic_library"
          },
          {
            id: "4",
            letter: "⭐",
            title: "Topic agreed",
            description: "You already have consensus on the topic",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "topic_self_reflect",
          "2": "topic_ideation_call",
          "3": "topic_library",
          "4": "continue_project"
        },
        learningObjectives: ["Topic identification", "Ideation techniques", "Research methods"]
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

      // Communication Issues (v0.2)
      {
        id: "no_comm",
        title: "Communication Problems",
        description: "People don't communicate effectively. Team members aren't sharing information or coordinating well.",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Empathy check session",
            description: "Run a session to understand individual communication preferences",
            nextScenario: "empathy_check"
          },
          {
            id: "2",
            letter: "🛠️",
            title: "Set up daily check-ins",
            description: "Establish regular communication rhythms and touchpoints",
            nextScenario: "daily_setup"
          },
          {
            id: "3",
            letter: "🤝",
            title: "Create communication contract",
            description: "Define team agreements on how and when to communicate",
            nextScenario: "comm_contract"
          }
        ],
        nextScenarios: {
          "1": "empathy_check",
          "2": "daily_setup",
          "3": "comm_contract"
        },
        learningObjectives: ["Communication protocols", "Team alignment", "Empathy building"]
      },

      // Team Break Scenarios (v0.2)
      {
        id: "team_break",
        title: "Team Breakdown",
        description: "The team is falling apart due to major conflicts and relationship issues. What's your approach?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Team retrospective",
            description: "Run a structured retrospective to identify root causes",
            nextScenario: "retro_break"
          },
          {
            id: "2",
            letter: "🤝",
            title: "Form new team",
            description: "Pivot to forming a completely new team",
            nextScenario: "pivot_new_team"
          },
          {
            id: "3",
            letter: "🚩",
            title: "Seek external help",
            description: "Contact lecturer or mentor for mediation",
            nextScenario: "seek_help"
          }
        ],
        nextScenarios: {
          "1": "retro_break",
          "2": "pivot_new_team",
          "3": "seek_help"
        },
        learningObjectives: ["Conflict resolution", "Team recovery", "Crisis management"]
      },

      // Low Motivation (v0.2)
      {
        id: "low_motivation",
        title: "Low Team Motivation",
        description: "Team members seem disengaged and unmotivated. How do you re-energize the group?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Map personal goals",
            description: "Understand what motivates each team member individually",
            nextScenario: "goal_mapping"
          },
          {
            id: "2",
            letter: "🛠️",
            title: "Create side quest",
            description: "Add a fun, low-stakes challenge to rebuild engagement",
            nextScenario: "side_quest"
          },
          {
            id: "3",
            letter: "🤝",
            title: "Celebrate small wins",
            description: "Recognize progress and achievements to boost morale",
            nextScenario: "small_wins"
          }
        ],
        nextScenarios: {
          "1": "goal_mapping",
          "2": "side_quest",
          "3": "small_wins"
        },
        learningObjectives: ["Motivation techniques", "Team engagement", "Goal alignment"]
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
      },

      // Additional missing scenarios
      {
        id: "team_break",
        title: "Team Breakdown",
        description: "Major conflicts and relationship breakdowns are threatening the team's ability to work together effectively.",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Facilitate conflict resolution session",
            description: "Address underlying issues through structured discussion",
            nextScenario: "continue_project"
          },
          {
            id: "2",
            letter: "⚠️",
            title: "Seek external mediation",
            description: "Bring in instructor or neutral party to help resolve conflicts",
            nextScenario: "seek_help"
          }
        ],
        nextScenarios: {
          "1": "continue_project",
          "2": "seek_help"
        },
        learningObjectives: ["Conflict resolution", "Team repair", "Mediation"]
      },

      {
        id: "seek_help",
        title: "External Support Required",
        description: "Team needs external help – contact instructor or mentor for next steps. 🆘",
        characterId: null,
        decisions: [],
        nextScenarios: {},
        learningObjectives: ["Knowing when to seek help", "Resource identification"]
      },

      {
        id: "low_motivation",
        title: "Low Team Motivation",
        description: "Team members seem disengaged and unmotivated. How do you re-energize the group?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🎯",
            title: "Reconnect with project purpose",
            description: "Remind team of project goals and individual contributions",
            nextScenario: "continue_project"
          },
          {
            id: "2",
            letter: "🏃",
            title: "Introduce energizing activities",
            description: "Add team-building exercises or change working methods",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project",
          "2": "continue_project"
        },
        learningObjectives: ["Motivation techniques", "Team engagement"]
      },

      {
        id: "find_respondents",
        title: "Finding Research Participants",
        description: "Team can't find respondents for research. What's your strategy?",
        characterId: "have_team",
        decisions: [
          {
            id: "1",
            letter: "🔍",
            title: "Reach out to networks",
            description: "Use personal and alumni networks via LinkedIn/Teams",
            nextScenario: "continue_project"
          },
          {
            id: "2",
            letter: "🛠",
            title: "Use recruiting platforms",
            description: "Try UserTesting, Useberry or similar services",
            nextScenario: "continue_project"
          }
        ],
        nextScenarios: {
          "1": "continue_project",
          "2": "continue_project"
        },
        learningObjectives: ["Research recruitment", "Network utilization"]
      },

      // Add missing scenarios from v0.2 specification
      {
        id: "lack_diversity",
        title: "Missing Expertise",
        description: "Team members share the same expertise; missing other viewpoints and skills.",
        characterId: "have_team", 
        decisions: [
          { id: "1", letter: "🛠️", title: "Run skill audit", description: "Run a skill audit (radar chart) to see missing roles", nextScenario: "skill_audit" },
          { id: "2", letter: "🤝", title: "Invite guest member", description: "Invite a guest member for one sprint", nextScenario: "guest_join" },
          { id: "3", letter: "🔍", title: "Post skill-gap call", description: "Post a skill‑gap call in Teams channel", nextScenario: "diversity_call" }
        ],
        nextScenarios: { "1": "skill_audit", "2": "guest_join", "3": "diversity_call" },
        learningObjectives: ["Skill assessment", "Team composition", "Expertise gap analysis"]
      },

      {
        id: "scope_overload", 
        title: "Overwhelming Scope",
        description: "Team underestimated scope; everyone feels overwhelmed by the project size.",
        characterId: "have_team",
        decisions: [
          { id: "1", letter: "🛠️", title: "MoSCoW prioritisation", description: "Do a MoSCoW prioritisation, cut Could/Won't have features", nextScenario: "moscow_prior" },
          { id: "2", letter: "🚩", title: "Negotiate with lecturer", description: "Negotiate with lecturer scope/deadline change", nextScenario: "teacher_negotiation" }, 
          { id: "3", letter: "🤝", title: "Use Scope Canvas", description: "Use Scope Canvas to agree the smallest MVP", nextScenario: "scope_iterate" }
        ],
        nextScenarios: { "1": "moscow_prior", "2": "teacher_negotiation", "3": "scope_iterate" },
        learningObjectives: ["Scope management", "Prioritization", "MVP definition"]
      },

      // Topic Development Sub-nodes
      { id: "topic_self_reflect", title: "Self-Reflection Success", description: "Personal brainstorm helped identify compelling problems. Topic direction established.", characterId: "no_topic", decisions: [{ id: "1", letter: "⭐", title: "Continue with chosen topic", description: "Move forward with project", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Self-reflection", "Problem identification"] },

      { id: "topic_ideation_call", title: "Ideation Call Success", description: "Collaborative ideation session generated great ideas. Team has consensus on top 3 options.", characterId: "no_topic", decisions: [{ id: "1", letter: "⭐", title: "Select final topic", description: "Choose from top 3 and proceed", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Collaborative ideation", "Consensus building"] },

      { id: "topic_library", title: "Library Research Success", description: "Challenge library provided inspiring direction. Found resonant problems to tackle.", characterId: "no_topic", decisions: [{ id: "1", letter: "⭐", title: "Develop chosen challenge", description: "Build on selected problem", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Research methods", "Problem exploration"] },

      // Team Formation Sub-nodes
      { id: "profile_share", title: "Profile Success", description: "Your profile attracted people with complementary abilities. Team is forming!", characterId: "no_team", decisions: [{ id: "1", letter: "⭐", title: "Join the new team", description: "Team formation successful", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Self-presentation", "Team attraction"] },

      { id: "guest_join", title: "Guest Role Success", description: "Guest sprint went well! Team invites you for next sprint. Fresh perspective was valuable.", characterId: "no_team", decisions: [{ id: "1", letter: "⭐", title: "Accept full membership", description: "Join as permanent member", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Trial collaboration", "Value demonstration"] },

      { id: "recruit_own", title: "Recruitment Success", description: "Your job posting attracted quality applicants. Chemistry calls went well.", characterId: "no_team", decisions: [{ id: "1", letter: "⭐", title: "Form the team", description: "Start working together", nextScenario: "continue_project" }, { id: "2", letter: "🚩", title: "Not enough responses", description: "Need to adjust approach", nextScenario: "seek_help" }], nextScenarios: { "1": "continue_project", "2": "seek_help" }, learningObjectives: ["Team recruitment", "Leadership"] },

      // End States
      { id: "project_cancelled", title: "Project Pivot", description: "Project cancelled or pivoted. Learn, document insights, consider a fresh start.", characterId: null, decisions: [], nextScenarios: {}, learningObjectives: ["Learning from failure", "Reflection"] },

      // Success routing sub-nodes (compact implementations following v0.2 routing conventions)
      { id: "empathy_check", title: "Communication Improved", description: "Empathy check improved understanding. Team communication flows better.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Continue", description: "Keep collaborating", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Empathy", "Communication"] },
      
      { id: "daily_setup", title: "Check-ins Established", description: "Daily rhythms created. Team coordination improved significantly.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Continue", description: "Keep collaborating", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Routine building", "Communication"] },
      
      { id: "comm_contract", title: "Contract Success", description: "Communication agreements established. Everyone knows expectations.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Continue", description: "Keep collaborating", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Agreement setting", "Clarity"] },

      { id: "retro_break", title: "Recovery Plan", description: "Retrospective found causes. Recovery plan agreed.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Implement plan", description: "Execute recovery", nextScenario: "continue_project" }, { id: "2", letter: "❌", title: "No agreement", description: "Cannot proceed", nextScenario: "project_cancelled" }], nextScenarios: { "1": "continue_project", "2": "project_cancelled" }, learningObjectives: ["Recovery", "Reflection"] },

      { id: "pivot_new_team", title: "New Team Formed", description: "Successfully formed new team with better dynamics.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Start fresh", description: "Begin collaboration", nextScenario: "continue_project" }, { id: "2", letter: "❌", title: "No one joined", description: "Cannot form team", nextScenario: "project_cancelled" }], nextScenarios: { "1": "continue_project", "2": "project_cancelled" }, learningObjectives: ["Team reformation", "Fresh starts"] },

      { id: "goal_mapping", title: "Goals Aligned", description: "Personal motivations mapped and aligned with project goals.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Continue motivated", description: "Team re-energized", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Motivation", "Goal alignment"] },

      { id: "side_quest", title: "Engagement Restored", description: "Fun challenge restored team energy and collaboration.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Apply to main project", description: "Transfer energy", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Gamification", "Engagement"] },

      { id: "small_wins", title: "Morale Boosted", description: "Celebrating achievements restored team confidence.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Build momentum", description: "Continue progress", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Recognition", "Momentum"] },

      { id: "decision_matrix", title: "Decision Made", description: "Matrix analysis provided clear direction.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Implement decision", description: "Move forward", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Decision making", "Analysis"] },

      { id: "dot_vote", title: "Democratic Choice", description: "Dot voting achieved team consensus on direction.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Proceed with choice", description: "Implement solution", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Democratic process", "Consensus"] },

      { id: "prototype_spike", title: "Option Validated", description: "Prototype testing revealed the best approach.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Build on prototype", description: "Scale solution", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Prototyping", "Validation"] },

      { id: "network_reach", title: "Respondents Found", description: "Personal networks provided research participants.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Begin research", description: "Start data collection", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Network utilization", "Research recruitment"] },

      { id: "platform_recruit", title: "Platform Success", description: "Recruiting platforms delivered quality participants.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Conduct research", description: "Execute study", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Platform usage", "Professional recruitment"] },

      { id: "teacher_broadcast", title: "Broadcast Effective", description: "School newsletter reached target participants.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Schedule sessions", description: "Organize research", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Institutional support", "Broadcast reach"] },

      { id: "skill_audit", title: "Skills Mapped", description: "Radar chart revealed missing expertise areas.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Address gaps", description: "Recruit missing skills", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Skill assessment", "Gap analysis"] },

      { id: "diversity_call", title: "Expertise Added", description: "Skill-gap call attracted needed expertise.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Integrate new skills", description: "Onboard expertise", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Skill acquisition", "Team expansion"] },

      { id: "moscow_prior", title: "Scope Prioritized", description: "MoSCoW method clarified essential features.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Focus on Must-haves", description: "Execute priorities", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Prioritization", "Scope management"] },

      { id: "teacher_negotiation", title: "Scope Adjusted", description: "Lecturer agreed to modified scope and timeline.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Proceed with changes", description: "Work within new scope", nextScenario: "continue_project" }], nextScenarios: { "1": "continue_project" }, learningObjectives: ["Negotiation", "Scope adjustment"] },

      { id: "scope_iterate", title: "MVP Defined", description: "Scope Canvas helped team agree on smallest viable product.", characterId: "have_team", decisions: [{ id: "1", letter: "⭐", title: "Build MVP", description: "Focus on core features", nextScenario: "continue_project" }, { id: "2", letter: "❌", title: "Still conflict", description: "Cannot agree", nextScenario: "project_cancelled" }], nextScenarios: { "1": "continue_project", "2": "project_cancelled" }, learningObjectives: ["MVP planning", "Consensus building"] }
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

  async getTotalScenarioCount(): Promise<number> {
    return this.scenarios.size;
  }

  async getVisitedScenariosCount(sessionId: string): Promise<number> {
    const progress = await this.getGameProgress(sessionId);
    if (!progress || !progress.completedScenarios) return 0;
    return progress.completedScenarios.length;
  }

  async getLearningMaterials(sessionId?: string): Promise<LearningMaterial[]> {
    let progressMaterial: LearningMaterial;
    
    if (sessionId) {
      const totalScenarios = await this.getTotalScenarioCount();
      const visitedScenarios = await this.getVisitedScenariosCount(sessionId);
      const percentage = totalScenarios > 0 ? Math.round((visitedScenarios / totalScenarios) * 100) : 0;
      
      progressMaterial = {
        id: "scenario-progress",
        title: "Your Learning Progress",
        type: "progress",
        icon: "chart",
        content: {
          completed: visitedScenarios,
          total: totalScenarios,
          percentage: percentage
        },
        color: "blue"
      };
    } else {
      progressMaterial = {
        id: "scenario-progress",
        title: "Your Learning Progress",
        type: "progress",
        icon: "chart",
        content: {
          completed: 0,
          total: await this.getTotalScenarioCount(),
          percentage: 0
        },
        color: "blue"
      };
    }

    return [
      progressMaterial,
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
