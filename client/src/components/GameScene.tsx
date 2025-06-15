import { Scenario, Decision } from "@shared/schema";
import { Button } from "@/components/ui/button";

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
    <div className="absolute inset-0 flex flex-col transition-all duration-500">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-4xl w-full shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-game-dark mb-4">
              {scenario.title}
            </h3>
            <p className="text-game-dark/80 text-lg">
              {scenario.description}
            </p>
          </div>
          
          <div className="space-y-4">
            {decisions.map((decision) => (
              <Button
                key={decision.id}
                data-decision={decision.id}
                onClick={() => handleDecisionClick(decision)}
                variant="ghost"
                className="w-full text-left p-4 bg-game-light hover:bg-game-yellow/20 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-game-yellow h-auto"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-game-blue rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 mt-1">
                    {decision.letter}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-game-dark">{decision.title}</p>
                    <p className="text-sm text-game-dark/70 mt-1">{decision.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
