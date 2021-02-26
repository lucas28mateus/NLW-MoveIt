import styles from '../styles/components/CompletedChallenges.module.css';
import { ChallengeContext} from '../contexts/ChallengeContext';
import { useContext } from 'react';

export function CompletedChallenges() {
    const {challengeCompleted} = useContext(ChallengeContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos </span>
            <span>{challengeCompleted}</span>
        </div>
    )
}