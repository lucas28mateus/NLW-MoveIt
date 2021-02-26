import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/LevelUpModal";


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount:number;
}

interface ChallengesContextData {
     
    level: number; 
    currentExperience: number; 
    challengeCompleted: number; 
    experienceToNextLevel: number;
    activeChalleng: Challenge ;
    startNewChallenge: () => void;
    closeLevelUpModal: () => void;
    CompleteChallange: () => void;
    ResetChalleng: () =>void;
    levelUp: () => void;
    
}


interface ChallengeProviderProps {
    children: ReactNode;
     level: number;
    currentExperience: number;
    challengeCompleted: number;
}

export const ChallengeContext = createContext({}as ChallengesContextData);


export function ChallengeProvider({children, ...rest}: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChalleng, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    }, [level, currentExperience, challengeCompleted])


    function levelUp() {
        setLevel(level + 1);
        setisLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setisLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChanllengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChanllengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission == 'granted') {
            new Notification('Novo desafio', {
                body: `valendo ${challenge.amount} xp!`
            })
        }
    }
    
    function ResetChalleng() {
    setActiveChallenge(null);
}

    function CompleteChallange() {
        if (!activeChalleng) {
            return;
        }

        const { amount } = activeChalleng;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);
    }

    return (
        <ChallengeContext.Provider 
         value={{
             level, 
             currentExperience, 
             startNewChallenge, 
             challengeCompleted,
             activeChalleng,
             ResetChalleng,
             experienceToNextLevel,
             CompleteChallange,
             closeLevelUpModal,
             levelUp
            }}
             >
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}