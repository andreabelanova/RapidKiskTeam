import { useEffect, useState } from "react";

interface FloatingIcon {
  id: string;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface FloatingIconsProps {
  scenarioId: string;
}

const getIconsForScenario = (scenarioId: string): string[] => {
  if (scenarioId.includes("dominant") || scenarioId.includes("talk") || scenarioId.includes("round")) {
    return ["🗣️", "⏱️", "🤐", "📢", "⚖️", "👥", "🎯"];
  }
  if (scenarioId.includes("decision") || scenarioId.includes("conflict")) {
    return ["🤔", "💡", "⚖️", "🎯", "📊", "🔍", "✅"];
  }
  if (scenarioId.includes("team") || scenarioId.includes("have_team")) {
    return ["👥", "🤝", "💬", "🔧", "⚡", "🎪", "🌟"];
  }
  if (scenarioId.includes("success") || scenarioId.includes("continue") || scenarioId.includes("happy")) {
    return ["⭐", "🎉", "✅", "🏆", "🌟", "💪", "🚀"];
  }
  return ["💡", "🎯", "🔍", "⚡", "🌟", "🤝", "📈"];
};

export function FloatingIcons({ scenarioId }: FloatingIconsProps) {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const iconEmojis = getIconsForScenario(scenarioId);
    const newIcons: FloatingIcon[] = [];

    // Create 8-12 floating icons
    const iconCount = Math.floor(Math.random() * 5) + 8;
    
    for (let i = 0; i < iconCount; i++) {
      newIcons.push({
        id: `icon-${i}`,
        emoji: iconEmojis[Math.floor(Math.random() * iconEmojis.length)],
        x: Math.random() * 100, // Percentage
        y: Math.random() * 100, // Percentage
        delay: Math.random() * 4, // 0-4s delay
        duration: 3 + Math.random() * 4, // 3-7s duration
      });
    }

    setIcons(newIcons);
  }, [scenarioId]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute text-2xl opacity-20 animate-float"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
          }}
        >
          {icon.emoji}
        </div>
      ))}
    </div>
  );
}