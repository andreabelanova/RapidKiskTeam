import { Scenario, Decision } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { FloatingIcons } from "./FloatingIcons";
import { CharacterIllustration } from "./CharacterIllustrations";
import { useState } from "react";

const getNodeTheme = (scenarioId: string) => {
  if (scenarioId === "start") return "bg-gradient-to-br from-blue-500 to-blue-600";
  if (scenarioId.includes("team") || scenarioId.includes("problem") || scenarioId.includes("conflict")) {
    return "bg-gradient-to-br from-red-500 to-orange-500";
  }
  if (scenarioId.includes("success") || scenarioId.includes("happy") || scenarioId.includes("continue")) {
    return "bg-gradient-to-br from-green-500 to-emerald-500";
  }
  return "bg-gradient-to-br from-blue-500 to-indigo-500";
};

const getScenarioIllustrationType = (scenarioId: string): 
  'have_team' | 'no_team' | 'no_topic' | 'dominant_member' | 'decision_conflict' | 'communication' | 'success' | 'continue_project' | 'seek_help' | 'project_cancelled' | 'happy_student' => {
  // End-state scenarios with custom illustrations
  if (scenarioId === "continue_project") return "continue_project";
  if (scenarioId === "seek_help") return "seek_help";
  if (scenarioId === "project_cancelled") return "project_cancelled";
  if (scenarioId === "happy_student") return "happy_student";
  
  // Regular scenarios
  if (scenarioId.includes("dominant")) return "dominant_member";
  if (scenarioId.includes("conflict")) return "decision_conflict";
  if (scenarioId.includes("communication") || scenarioId.includes("talk")) return "communication";
  if (scenarioId.includes("success")) return "success";
  if (scenarioId.includes("no_team") || scenarioId.includes("looking")) return "no_team";
  if (scenarioId.includes("no_topic") || scenarioId.includes("topic")) return "no_topic";
  return "have_team";
};

interface GameSceneProps {
  scenario: Scenario;
  onDecisionSelect: (decision: Decision) => void;
  isVisible: boolean;
}

export function GameScene({ scenario, onDecisionSelect, isVisible }: GameSceneProps) {
  if (!isVisible) return null;

  const decisions = scenario.decisions as Decision[];
  const isEndState = ['continue_project', 'seek_help', 'project_cancelled', 'happy_student'].includes(scenario.id);
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);

  const handleDecisionClick = (decision: Decision) => {
    setSelectedDecisionId(decision.id);
    
    setTimeout(() => {
      onDecisionSelect(decision);
      setSelectedDecisionId(null); // Reset selection after navigation
    }, 500);
  };

  // Enhanced end-state layout with 100metod styling
  if (isEndState) {
    return (
      <div className="bg-academic-light min-h-screen">
        <div className="academic-container py-20">
          <div className="max-w-6xl mx-auto">
            {/* Large centered illustration with 100metod styling */}
            <div className="text-center mb-16">
              <div className="bg-white rounded-2xl p-12 mb-12 shadow-lg">
                <CharacterIllustration 
                  type={getScenarioIllustrationType(scenario.id)} 
                  className="w-96 h-72 mx-auto object-contain mb-8"
                />
              </div>
              
              {/* Enhanced title and description with 100metod typography */}
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold academic-text mb-8 leading-tight">
                  {scenario.title}
                </h1>
                <p className="text-2xl text-academic-text-light leading-relaxed mb-12">
                  {scenario.description}
                </p>
              </div>
            </div>
            
            {/* Decision buttons with state-based selection */}
            <div className="space-y-6 max-w-3xl mx-auto">
              {decisions.map((decision) => (
                <div
                  key={decision.id}
                  onClick={() => handleDecisionClick(decision)}
                  className={`cursor-pointer group transition-all duration-300 ${
                    selectedDecisionId === decision.id 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-xl transform scale-105 p-6 rounded-xl border-2 border-yellow-300' 
                      : 'academic-card hover:shadow-lg hover:transform hover:scale-102'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-academic-blue/10 rounded-lg flex items-center justify-center">
                        <span className="text-academic-blue font-medium">
                          {decision.letter}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium academic-text mb-2 group-hover:text-academic-blue transition-colors">
                        {decision.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {decision.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-academic-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular scenario layout with 100metod styling
  return (
    <div className="bg-academic-light min-h-screen">
      <div className="academic-container py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center academic-spacing">
            <div className="bg-white rounded-2xl p-12 mb-12 shadow-lg">
              <div className="flex items-center justify-center mb-8">
                <CharacterIllustration 
                  type={getScenarioIllustrationType(scenario.id)} 
                  className="w-40 h-32 drop-shadow-sm mr-8"
                />
                <div className="text-left">
                  <h1 className="text-3xl font-bold academic-text mb-6 leading-tight">
                    {scenario.title}
                  </h1>
                  <p className="text-xl text-academic-text-light leading-relaxed max-w-3xl">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {decisions.map((decision, index) => (
              <div
                key={decision.id}
                onClick={() => handleDecisionClick(decision)}
                className={`cursor-pointer group transition-all duration-300 ${
                  selectedDecisionId === decision.id 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-xl transform scale-105 p-6 rounded-xl border-2 border-yellow-300' 
                    : 'academic-card hover:shadow-lg hover:transform hover:scale-102'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-academic-blue/10 rounded-lg flex items-center justify-center">
                      <span className="text-academic-blue font-medium">
                        {decision.letter}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium academic-text mb-2 group-hover:text-academic-blue transition-colors">
                      {decision.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {decision.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-academic-blue opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
