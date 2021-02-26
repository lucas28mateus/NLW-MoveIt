import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const {level, closeLevelUpModal} = useContext(ChallengeContext)
    
    return (
        <div className={styles.overLay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabens</strong>
                <p>Você alcançou um novo nivel.</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    )
}