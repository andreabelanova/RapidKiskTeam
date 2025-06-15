import { ArrowLeft, Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  showBackButton: boolean;
  onBackClick: () => void;
  onMaterialsToggle: () => void;
}

export function GameHeader({ showBackButton, onBackClick, onMaterialsToggle }: GameHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <Button
              onClick={onBackClick}
              className="game-button bg-game-yellow text-game-dark hover:bg-yellow-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-game-dark">RapidKISK Team</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={onMaterialsToggle}
            className="game-button bg-game-blue text-white hover:bg-blue-600 font-medium"
          >
            <Book className="w-4 h-4 mr-2" />
            Materials
          </Button>
          <div className="w-8 h-8 bg-game-yellow rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-game-dark" />
          </div>
        </div>
      </div>
    </header>
  );
}
