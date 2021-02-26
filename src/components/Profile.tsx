import styles from '../styles/components/Profile.module.css';
import { ChallengeContext} from '../contexts/ChallengeContext';
import { useContext } from 'react';

export function Profile() {
    const {level} = useContext(ChallengeContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/lucas28mateus.png" alt="lucas"/>
            <div>
                <strong>Lucas Mateus</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                   Level {level}
                </p>
            </div>
        </div>
    )
}