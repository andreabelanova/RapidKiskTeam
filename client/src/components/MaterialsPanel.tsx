import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, Users, TrendingUp, Download } from "lucide-react";
import { LearningMaterial } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/lib/gameApi";

interface MaterialsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MaterialsPanel({ isOpen, onClose }: MaterialsPanelProps) {
  const { data: materials, isLoading } = useQuery({
    queryKey: ["/api/learning-materials"],
    queryFn: gameApi.getLearningMaterials,
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
        className={`materials-panel fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-40 overflow-y-auto ${
          isOpen ? 'open' : ''
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-game-dark">Learning Materials</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-game-dark/60 hover:text-game-dark"
            >
              <X className="w-5 h-5" />
            </Button>
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
                <div key={material.id} className={`rounded-xl p-4 ${getColorClasses(material.color)}`}>
                  <h4 className="font-semibold text-game-dark mb-2 flex items-center">
                    <span className={getColorClasses(material.color).split(' ')[1]}>
                      {getIcon(material.icon)}
                    </span>
                    <span className="ml-2">{material.title}</span>
                  </h4>
                  {renderMaterialContent(material)}
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
