import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengeContext} from '../contexts/ChallengeContext';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';


export function ChallengeBox() {
  const {activeChalleng, ResetChalleng,CompleteChallange} = useContext(ChallengeContext)
  const {resetCountdow} = useContext(CountdownContext);


  function handleChallengeSucceeded() {
    CompleteChallange();
    resetCountdow();
  }

  function handleChallengeFalied() {
    ResetChalleng();
    resetCountdow()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChalleng ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChalleng.amount} xp</header>

          <main>
          <img src={`icons/${activeChalleng.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChalleng.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFalidedButton}
              onClick={handleChallengeFalied}
            >
              Falhei
              </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
             </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desefio</strong>
            <p>
              <img src="icons/level-up.svg" alt="level up" />
                    Avance de level completando os desafios.
                </p>
          </div>
        )}
    </div>
  )
}