import Head from 'next/head';
import { GetServerSideProps } from 'next'

import { Countdown } from '../components/Countdown';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox"
import { ChallengeProvider } from '../contexts/ChallengeContext'



import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: HomeProps) {
  return (

    <ChallengeProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengeCompleted={props.challengeCompleted} 
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div  >
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>

      </div>
    </ChallengeProvider>


  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }

  }
}
