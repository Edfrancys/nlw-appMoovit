/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { CompleteChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { Chalengebox } from '../components/Chalengebox';

import Head from 'next/head';

import styles from '../styles/pages/Moveit.module.css';
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengesProvider } from '../context/ChallengesContext';
import { BarNavigation } from '../components/BarNavigation';
import { AuthContext } from '../context/AuthContext';

interface HomeProps {
    level: number,
    currenceExpirience: number,
    challengesComplete: number
}

export default function Home(props: HomeProps): JSX.Element {
	
	const { load } = useContext(AuthContext);

	if (load === true) {
		return (
			<div className={styles.containerLoad}>
				<p>Loading ...</p>
			</div>
		);
	} else {
		return (
			<>
				<Head>
					<title>Home | App Movit</title>
				</Head>
	
				<ChallengesProvider
					level={props.level}
					currenceExpirience={props.currenceExpirience}
					challengesComplete={props.challengesComplete}
				>
					<div className={styles.container} >
	
						<ExperienceBar />
	
						<CountdownProvider>
	
							<BarNavigation />
	
							<section>
								<div>
									<Profile />
									<CompleteChallenges />
									<CountDown />
								</div>
	
								<div>
									<Chalengebox />
								</div>
							</section>
						</CountdownProvider>
					</div>
				</ChallengesProvider>
			</>
		);
	}

	
	
	
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

	const { level, currenceExpirience, challengesComplete } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			currenceExpirience: Number(currenceExpirience),
			challengesComplete: Number(challengesComplete)
		}
	};
};