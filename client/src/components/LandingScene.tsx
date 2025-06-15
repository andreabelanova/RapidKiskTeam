import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Character } from "@shared/schema";
import { HelpCircle } from "lucide-react";
import { CharacterIllustration } from "./CharacterIllustrations";

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
    <div className="bg-academic-white min-h-screen">
      <div className="academic-container py-16">
        <div className="text-center academic-spacing">
          <h2 className="text-3xl font-light academic-text mb-4">
            Where are you on your team journey?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This interactive decision support tool helps you navigate common team collaboration 
            challenges in online education environments. Select your current situation to receive 
            personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`academic-card cursor-pointer group ${
                selectedCharacter?.id === character.id ? 'border-academic-blue shadow-lg' : ''
              }`}
              onClick={() => handleCharacterClick(character)}
            >
              <div className="overflow-hidden">
                {/* Large full-width image */}
                <div className="w-full">
                  <CharacterIllustration 
                    type={character.id as 'have_team' | 'no_team' | 'no_topic'} 
                    className="w-full h-32 object-contain bg-gray-50"
                  />
                </div>
                
                {/* Content below image */}
                <div className="p-4">
                  {/* H2 Headline */}
                  <h2 className="text-xl font-medium academic-text mb-3">
                    {character.name}
                  </h2>
                  
                  {/* Perex text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {character.description}
                  </p>
                  
                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {character.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  
                  {/* Call to action */}
                  <div className="text-academic-blue text-sm font-medium group-hover:text-blue-700 transition-colors">
                    Begin Assessment →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Based on radical collaboration principles for online learning environments
          </p>
        </div>
      </div>
    </div>
  );
}
