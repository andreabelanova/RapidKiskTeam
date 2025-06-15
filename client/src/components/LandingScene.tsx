import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Character } from "@shared/schema";
import { HelpCircle } from "lucide-react";

interface LandingSceneProps {
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
  isVisible: boolean;
}

export function LandingScene({ characters, onCharacterSelect, isVisible }: LandingSceneProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    // Add selection animation delay
    setTimeout(() => {
      onCharacterSelect(character);
    }, 500);
  };

  const getCharacterButtonClass = (character: Character) => {
    switch (character.colorTheme) {
      case "blue":
        return "bg-game-blue text-white hover:bg-blue-600";
      case "yellow":
        return "bg-game-yellow text-game-dark hover:bg-yellow-300";
      case "gradient":
        return "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600";
      default:
        return "bg-game-blue text-white hover:bg-blue-600";
    }
  };

  const getTraitColors = (trait: string) => {
    const colorMap: { [key: string]: string } = {
      "Leadership": "bg-game-blue/10 text-game-blue",
      "Communication": "bg-game-yellow/20 text-game-dark",
      "Empathy": "bg-green-100 text-green-700",
      "Analysis": "bg-purple-100 text-purple-700",
      "Problem Solving": "bg-game-blue/10 text-game-blue",
      "Research": "bg-orange-100 text-orange-700",
      "Creativity": "bg-pink-100 text-pink-700",
      "Innovation": "bg-game-yellow/20 text-game-dark",
      "Vision": "bg-indigo-100 text-indigo-700"
    };
    return colorMap[trait] || "bg-gray-100 text-gray-700";
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500">
      <div className="text-center mb-12 animate-bounce-gentle">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          RapidKISK Team
        </h2>
        <p className="text-xl md:text-2xl text-game-yellow font-medium mb-2">Interactive Game</p>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Master team collaboration skills through interactive decision-making scenarios. 
          Choose your character and navigate real-world online education challenges.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Choose Your Character
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`character-card bg-white rounded-2xl p-6 shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 ${
                selectedCharacter?.id === character.id ? 'animate-pulse-glow scale-105' : ''
              }`}
              onClick={() => handleCharacterClick(character)}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-game-yellow to-yellow-300">
                <img 
                  src={character.imageUrl}
                  alt={`${character.name} character`}
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-game-dark mb-3 text-center">
                {character.name}
              </h4>
              <p className="text-game-dark/80 text-center mb-4 text-sm md:text-base">
                {character.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {character.traits.map((trait) => (
                  <span
                    key={trait}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTraitColors(trait)}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
              <Button
                className={`w-full py-3 rounded-xl font-medium transition-colors duration-200 ${getCharacterButtonClass(character)}`}
              >
                Select Character
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-white/80 text-sm md:text-base mb-4">
            Each character offers unique perspectives and decision-making approaches
          </p>
          <Button
            variant="ghost"
            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-medium"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Learn More About Characters
          </Button>
        </div>
      </div>
    </div>
  );
}
