import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { gameApi } from "@/lib/gameApi";
import { Character, Scenario, Decision } from "@shared/schema";
import { GameHeader } from "@/components/GameHeader";
import { LandingScene } from "@/components/LandingScene";
import { GameScene } from "@/components/GameScene";
import { MaterialsPanel } from "@/components/MaterialsPanel";
import { queryClient } from "@/lib/queryClient";

type GameState = "landing" | "playing";

export default function Game() {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Fetch characters
  const { data: characters, isLoading: charactersLoading } = useQuery({
    queryKey: ["/api/characters"],
    queryFn: gameApi.getCharacters,
  });

  // Create game progress mutation
  const createProgressMutation = useMutation({
    mutationFn: gameApi.createGameProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/game-progress", sessionId] });
    },
  });

  // Update game progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: ({ sessionId, updates }: { sessionId: string; updates: any }) =>
      gameApi.updateGameProgress(sessionId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/game-progress", sessionId] });
    },
  });

  // Get first scenario when character is selected
  const { data: scenarios } = useQuery({
    queryKey: ["/api/characters", selectedCharacter?.id, "scenarios"],
    queryFn: () => gameApi.getCharacterScenarios(selectedCharacter!.id),
    enabled: !!selectedCharacter,
  });

  useEffect(() => {
    if (scenarios && scenarios.length > 0 && !currentScenario) {
      setCurrentScenario(scenarios[0]);
    }
  }, [scenarios, currentScenario]);

  const handleCharacterSelect = async (character: Character) => {
    setSelectedCharacter(character);
    
    // Create game progress
    try {
      await createProgressMutation.mutateAsync({
        sessionId,
        selectedCharacter: character.id,
      });
    } catch (error) {
      console.error("Failed to create game progress:", error);
    }
    
    setGameState("playing");
  };

  const handleDecisionSelect = async (decision: Decision) => {
    if (!currentScenario || !selectedCharacter) return;

    try {
      // Update game progress with decision
      await updateProgressMutation.mutateAsync({
        sessionId,
        updates: {
          currentScenario: currentScenario.id,
          decisions: {
            [currentScenario.id]: decision.id,
          },
        },
      });

      // Load next scenario if available
      if (decision.nextScenario) {
        const nextScenario = await gameApi.getScenario(decision.nextScenario);
        setCurrentScenario(nextScenario);
      } else {
        // End of scenario chain
        console.log("Scenario completed!");
      }
    } catch (error) {
      console.error("Failed to process decision:", error);
    }
  };

  const handleBackClick = () => {
    setGameState("landing");
    setSelectedCharacter(null);
    setCurrentScenario(null);
  };

  const toggleMaterials = () => {
    setMaterialsOpen(!materialsOpen);
  };

  if (charactersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-blue to-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-blue to-blue-600 overflow-hidden">
      <GameHeader
        showBackButton={gameState === "playing"}
        onBackClick={handleBackClick}
        onMaterialsToggle={toggleMaterials}
      />

      <main className="pt-20 h-screen overflow-hidden relative">
        <LandingScene
          characters={characters || []}
          onCharacterSelect={handleCharacterSelect}
          isVisible={gameState === "landing"}
        />

        {currentScenario && (
          <GameScene
            scenario={currentScenario}
            onDecisionSelect={handleDecisionSelect}
            isVisible={gameState === "playing"}
          />
        )}
      </main>

      <MaterialsPanel isOpen={materialsOpen} onClose={() => setMaterialsOpen(false)} />
    </div>
  );
}
