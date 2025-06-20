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

interface NavigationHistory {
  scenarioId: string;
  selectedCharacter?: Character;
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory[]>([]);
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

  // Load scenarios on mount
  useEffect(() => {
    const loadStartScenario = async () => {
      if (gameState === "landing" && !currentScenario) {
        try {
          const scenario = await gameApi.getScenario("start");
          setCurrentScenario(scenario);
        } catch (error) {
          console.error("Failed to load start scenario:", error);
        }
      }
    };
    loadStartScenario();
  }, [gameState, currentScenario]);

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
    
    // Load the character-specific scenario
    try {
      const nextScenario = await gameApi.getScenario(character.id);
      setCurrentScenario(nextScenario);
    } catch (error) {
      console.error("Failed to load character scenario:", error);
    }
    
    setGameState("playing");
  };

  const handleDecisionSelect = async (decision: Decision) => {
    if (!currentScenario) return;

    try {
      // Add current state to navigation history
      setNavigationHistory(prev => [...prev, {
        scenarioId: currentScenario.id,
        selectedCharacter: selectedCharacter || undefined
      }]);

      // Update game progress with decision and track visited scenario
      const existingProgress = await gameApi.getGameProgress(sessionId).catch(() => null);
      const completedScenarios = existingProgress?.completedScenarios || [];
      
      // Add current scenario to completed list if not already present
      const updatedCompletedScenarios = completedScenarios.includes(currentScenario.id) 
        ? completedScenarios 
        : [...completedScenarios, currentScenario.id];

      await updateProgressMutation.mutateAsync({
        sessionId,
        updates: {
          currentScenario: currentScenario.id,
          completedScenarios: updatedCompletedScenarios,
          decisions: {
            ...(existingProgress?.decisions || {}),
            [currentScenario.id]: decision.id,
          },
        },
      });

      // Invalidate learning materials cache to update progress bar
      queryClient.invalidateQueries({ queryKey: ["/api/learning-materials", sessionId] });

      // Load next scenario if available
      if (decision.nextScenario) {
        await loadScenario(decision.nextScenario);
        
        // Auto-open materials panel for scenarios with support resources
        const scenariosWithMaterials = ['dominant_member', 'decision_conflict', 'find_team', 'guest_join'];
        if (scenariosWithMaterials.includes(decision.nextScenario)) {
          setTimeout(() => setMaterialsOpen(true), 1000);
        }
      } else {
        // End of scenario chain
        console.log("Scenario completed!");
      }
    } catch (error) {
      console.error("Failed to process decision:", error);
    }
  };

  const handleBackClick = () => {
    if (navigationHistory.length > 0) {
      const previousState = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      
      if (previousState.scenarioId === "start") {
        setGameState("landing");
        setSelectedCharacter(null);
        loadScenario("start");
      } else {
        loadScenario(previousState.scenarioId);
        if (previousState.selectedCharacter) {
          setSelectedCharacter(previousState.selectedCharacter);
        }
      }
    } else {
      setGameState("landing");
      setSelectedCharacter(null);
      loadScenario("start");
    }
  };

  const loadScenario = async (scenarioId: string) => {
    try {
      const scenario = await gameApi.getScenario(scenarioId);
      setCurrentScenario(scenario);
    } catch (error) {
      console.error("Failed to load scenario:", error);
    }
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
    <div className="min-h-screen bg-academic-white">
      <GameHeader
        showBackButton={gameState === "playing"}
        onBackClick={handleBackClick}
        onMaterialsToggle={toggleMaterials}
      />

      <main className="relative">
        <LandingScene
          characters={characters || []}
          onCharacterSelect={handleCharacterSelect}
          isVisible={gameState === "landing"}
        />

        {currentScenario && (
          <GameScene
            scenario={currentScenario}
            onDecisionSelect={handleDecisionSelect}
            onMaterialsToggle={() => setMaterialsOpen(true)}
            isVisible={gameState === "playing"}
          />
        )}
      </main>

      <MaterialsPanel 
        isOpen={materialsOpen} 
        onClose={() => setMaterialsOpen(false)}
        sessionId={sessionId}
      />
    </div>
  );
}
