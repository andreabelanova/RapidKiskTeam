import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, Users, TrendingUp, Download } from "lucide-react";
import { LearningMaterial } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/lib/gameApi";

interface MaterialsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export function MaterialsPanel({ isOpen, onClose, sessionId }: MaterialsPanelProps) {
  const { data: materials, isLoading } = useQuery({
    queryKey: ["/api/learning-materials", sessionId],
    queryFn: ({ queryKey }) => {
      const [, sessionId] = queryKey;
      return gameApi.getLearningMaterials(sessionId as string);
    },
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "lightbulb":
        return <Lightbulb className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      case "chart-line":
        return <TrendingUp className="w-5 h-5" />;
      case "download":
        return <Download className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-game-yellow/10 text-game-yellow";
      case "blue":
        return "bg-game-blue/10 text-game-blue";
      case "green":
        return "bg-green-50 text-green-600";
      case "purple":
        return "bg-purple-50 text-purple-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const renderMaterialContent = (material: LearningMaterial) => {
    switch (material.type) {
      case "concept":
        if (Array.isArray(material.content)) {
          return (
            <ul className="text-sm text-game-dark/80 space-y-1">
              {material.content.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          );
        }
        return <p className="text-sm text-game-dark/80">{material.content as string}</p>;
      
      case "progress":
        const progressData = material.content as { completed: number; total: number; percentage: number };
        return (
          <div className="text-sm text-game-dark/80">
            <p className="mb-2">
              Scenarios Completed: <span className="font-medium">{progressData.completed}/{progressData.total}</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressData.percentage}%` }}
              />
            </div>
          </div>
        );
      
      case "download":
      case "resource":
        const resources = material.content as Array<{ title: string; url: string }>;
        return (
          <div className="space-y-2">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-purple-600 hover:text-purple-800 hover:underline"
              >
                {resource.title}
              </a>
            ))}
          </div>
        );
      
      default:
        return <p className="text-sm text-game-dark/80">{material.content as string}</p>;
    }
  };

  return (
    <>
      <div 
        className={`materials-panel fixed top-0 right-0 w-full md:w-96 h-full bg-academic-white shadow-lg z-40 overflow-y-auto border-l border-academic-gray ${
          isOpen ? 'open' : ''
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-light academic-text">Learning Materials</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-academic-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {materials?.map((material) => (
                <div 
                  key={material.id} 
                  className="border border-academic-gray rounded-lg p-6 hover:border-academic-blue transition-colors"
                >
                  <h4 className="font-medium academic-text mb-3 flex items-center">
                    <span className="text-academic-blue mr-3">
                      {getIcon(material.icon)}
                    </span>
                    <span>{material.title}</span>
                  </h4>
                  <div className="text-gray-600">
                    {renderMaterialContent(material)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={onClose}
        />
      )}
    </>
  );
}
