import { Scenario, Decision } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { FloatingIcons } from "./FloatingIcons";
import { CharacterIllustration } from "./CharacterIllustrations";

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

interface GameSceneProps {
  scenario: Scenario;
  onDecisionSelect: (decision: Decision) => void;
  isVisible: boolean;
}

export function GameScene({ scenario, onDecisionSelect, isVisible }: GameSceneProps) {
  if (!isVisible) return null;

  const decisions = scenario.decisions as Decision[];

  const handleDecisionClick = (decision: Decision) => {
    // Add visual feedback
    const button = document.querySelector(`[data-decision="${decision.id}"]`);
    if (button) {
      (button as HTMLElement).style.background = 'linear-gradient(135deg, #FFD400, #FFC107)';
      (button as HTMLElement).style.transform = 'scale(1.02)';
    }
    
    setTimeout(() => {
      onDecisionSelect(decision);
    }, 500);
  };

  return (
    <div className="bg-academic-white min-h-screen">
      <div className="academic-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center academic-spacing">
            <div className="flex items-center justify-center mb-6">
              <CharacterIllustration 
                type={getScenarioIllustrationType(scenario.id)} 
                className="w-32 h-24 drop-shadow-sm mr-6"
              />
              <div className="text-left">
                <h2 className="text-2xl font-light academic-text mb-4">
                  {scenario.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  {scenario.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {decisions.map((decision, index) => (
              <div
                key={decision.id}
                data-decision={decision.id}
                onClick={() => handleDecisionClick(decision)}
                className="academic-card cursor-pointer group"
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
