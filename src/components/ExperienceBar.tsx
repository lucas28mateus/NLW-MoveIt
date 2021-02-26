import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import Styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;


  return (
    <header className={Styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width:`${percentToNextLevel}%`}} />

        <span className={Styles.currentExperince} style={{left:`${percentToNextLevel}%`}}>  
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
