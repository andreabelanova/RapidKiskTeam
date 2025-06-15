import haveTeamImg from "@assets/i have team_1749988424193.webp";
import noTeamImg from "@assets/I_do_not_have-team_1749988424194.webp";
import noTopicImg from "@assets/I do not have project topic_1749988424193.webp";
import continueProjectImg from "@assets/continue project_1749994786860.webp";
import seekHelpImg from "@assets/seek_help_1749994775132.webp";
import projectCancelledImg from "@assets/project canceled_1749994775132.webp";
import happyStudentImg from "@assets/succesfull happy student_1749994775133.webp";

interface CharacterIllustrationProps {
  type: 'have_team' | 'no_team' | 'no_topic' | 'dominant_member' | 'decision_conflict' | 'communication' | 'success' | 'continue_project' | 'seek_help' | 'project_cancelled' | 'happy_student';
  className?: string;
}

export function CharacterIllustration({ type, className = "w-20 h-20" }: CharacterIllustrationProps) {
  const imageMap = {
    have_team: haveTeamImg,
    no_team: noTeamImg,
    no_topic: noTopicImg,
    continue_project: continueProjectImg,
    seek_help: seekHelpImg,
    project_cancelled: projectCancelledImg,
    happy_student: happyStudentImg,
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