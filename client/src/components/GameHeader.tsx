import { ArrowLeft, Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  showBackButton: boolean;
  onBackClick: () => void;
  onMaterialsToggle: () => void;
}

export function GameHeader({ showBackButton, onBackClick, onMaterialsToggle }: GameHeaderProps) {
  return (
    <header className="bg-academic-white border-b border-academic-gray">
      <div className="academic-container">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-6">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="text-academic-blue hover:text-blue-700 text-sm font-medium transition-colors"
              >
                ← Back
              </button>
            )}
            <div>
              <h1 className="text-2xl font-light academic-text">RapidKISK Team</h1>
              <p className="text-sm text-gray-600 mt-1">Interactive Decision Support for Team Collaboration</p>
            </div>
          </div>
          <button
            onClick={onMaterialsToggle}
            className="text-academic-blue hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Learning Materials
          </button>
        </div>
      </div>
    </header>
  );
}
