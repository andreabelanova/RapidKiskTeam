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
    <div className="bg-academic-light min-h-screen">
      <div className="academic-container py-20">
        <div className="text-center academic-spacing">
          <h1 className="text-4xl font-bold academic-text mb-6">
            Where are you on your team journey?
          </h1>
          <p className="text-xl text-academic-text-light max-w-4xl mx-auto leading-relaxed mb-12">
            This interactive decision support tool helps you navigate common team collaboration 
            challenges in online education environments. Select your current situation to receive 
            personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`bg-white rounded-16 shadow-lg border-2 cursor-pointer group transition-all duration-300 hover:shadow-xl hover:border-academic-blue ${
                selectedCharacter?.id === character.id ? 'border-academic-blue bg-academic-blue-light' : 'border-academic-gray'
              }`}
              onClick={() => handleCharacterClick(character)}
            >
              <div className="overflow-hidden">
                {/* Large full-width image with 100metod styling */}
                <div className="w-full bg-academic-gray-light rounded-t-16 p-8">
                  <CharacterIllustration 
                    type={character.id as 'have_team' | 'no_team' | 'no_topic'} 
                    className="w-full h-40 object-contain"
                  />
                </div>
                
                {/* Content below image with improved spacing */}
                <div className="p-8">
                  {/* H2 Headline with 100metod typography */}
                  <h2 className="text-2xl font-bold academic-text mb-4 leading-tight">
                    {character.name}
                  </h2>
                  
                  {/* Description with improved typography */}
                  <p className="text-academic-text-light text-base leading-relaxed mb-6">
                    {character.description}
                  </p>
                  
                  {/* Chips with 100metod styling */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {character.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-4 py-2 bg-academic-blue-light text-academic-blue text-sm rounded-full font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  
                  {/* Call to action with 100metod styling */}
                  <div className="text-academic-blue text-base font-semibold group-hover:text-academic-blue-dark transition-colors">
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
