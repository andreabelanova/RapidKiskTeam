import haveTeamImg from "@assets/i have team_1749988424193.webp";
import noTeamImg from "@assets/I_do_not_have-team_1749988424194.webp";
import noTopicImg from "@assets/I do not have project topic_1749988424193.webp";

interface CharacterIllustrationProps {
  type: 'have_team' | 'no_team' | 'no_topic' | 'dominant_member' | 'decision_conflict' | 'communication' | 'success';
  className?: string;
}

export function CharacterIllustration({ type, className = "w-20 h-20" }: CharacterIllustrationProps) {
  const imageMap = {
    have_team: haveTeamImg,
    no_team: noTeamImg,
    no_topic: noTopicImg,
    // Fallback to have_team for other types
    dominant_member: haveTeamImg,
    decision_conflict: haveTeamImg,
    communication: haveTeamImg,
    success: haveTeamImg
  };

  return (
    <img 
      src={imageMap[type]} 
      alt={`Illustration for ${type.replace('_', ' ')}`}
      className={className}
    />
  );
}