import { ArrowLeft, Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  showBackButton: boolean;
  onBackClick: () => void;
  onMaterialsToggle: () => void;
}

export function GameHeader({ showBackButton, onBackClick, onMaterialsToggle }: GameHeaderProps) {
  return (
    <header className="bg-white border-b border-academic-gray shadow-sm">
      <div className="academic-container">
        <div className="flex items-center justify-between py-8">
          <div className="flex items-center space-x-8">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="flex items-center text-academic-blue hover:text-academic-blue-dark text-base font-semibold transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold academic-text">RapidKISK Team</h1>
              <p className="text-base text-academic-text-light mt-2">Interactive Decision Support for Team Collaboration</p>
            </div>
          </div>
          <button
            onClick={onMaterialsToggle}
            className="flex items-center bg-academic-blue text-white px-6 py-3 rounded-lg hover:bg-academic-blue-dark text-base font-semibold transition-colors shadow-md"
          >
            <Book className="w-5 h-5 mr-2" />
            Learning Materials
          </button>
        </div>
      </div>
    </header>
  );
}
