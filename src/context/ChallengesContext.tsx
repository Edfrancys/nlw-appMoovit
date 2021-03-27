/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable quotes */

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { db } from '../hooks/firebase';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,
    currenceExpirience: number,
    experienceToNextLevel: number,
    challengesComplete: number,
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currenceExpirience: number,
    challengesComplete: number
}

interface DataExpirienceFirestore {
	level: number
	currenceExpirience: number
	challengesComplete: number
	uid: string	
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
	children, 
	...rest 
}: ChallengesProviderProps): JSX.Element {

	const { user, experienceData } = useContext(AuthContext);

	const [level, setLevel] = useState(rest.level ?? 1);
	const [currenceExpirience, setCurrenceExpirience] = useState(rest.currenceExpirience ?? 0);
	const [challengesComplete, setChallengesComplete] = useState(rest.challengesComplete ?? 0);

	const [activeChallenge, setActiveChallenge] = useState(null);

	const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
		
	}, []);

	useEffect(() => {
		
		Cookie.set('level', String(level), { expires: 1 });
		Cookie.set('currenceExpirience', String(currenceExpirience), { expires: 1 });
		Cookie.set('challengesComplete', String(challengesComplete), { expires: 1 });

		console.log('Atualizou Level ou Experience ou Chalenges');
	}, [level, currenceExpirience, challengesComplete]);

	const updateDB = async (dadosNewXP) => {
		db.collection('experience')
			.doc(user.node_id)
			.set(dadosNewXP)
			.then((res) => {
				console.log('Update Experience Firebase',res);
			});
	};

	function levelUp() {
		setLevel(level + 1);
		setIsLevelUpModalOpen(true);
	}

	function closeLevelUpModal() {
		setIsLevelUpModalOpen(false);
        
	}

	function startNewChallenge() {
		const radomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[radomChallengeIndex];

		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play;

		if (Notification.permission === 'granted') {
			new Notification('Novo desafio', {
				body: `Valendo ${challenge.amount} de XP!`
			});			
		}


	}

	const resetChallenge = () => {
		setActiveChallenge(null);
	};

	function completeChallenge() {
		if (!activeChallenge) {
			return;
		}
		const { amount } = activeChallenge;

		let finalExperience = currenceExpirience + amount;

		let newLevel = level;
		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			let newLevel = level + 1;
			levelUp();
		}
		setCurrenceExpirience(finalExperience);
		setActiveChallenge(null);
		setChallengesComplete(challengesComplete + 1);

		const dadosNewXP = {
			"level": newLevel,
			"currenceExpirience": finalExperience,
			"challengesComplete": challengesComplete + 1,
			'uid': user.node_id
		};
		updateDB(dadosNewXP);
	}

	return (
		<ChallengesContext.Provider
			value={{
				level,
				levelUp,
				currenceExpirience,
				experienceToNextLevel,
				challengesComplete,
				startNewChallenge,
				activeChallenge,
				resetChallenge,
				completeChallenge,
				closeLevelUpModal
			}}>
			{children}

			{ isLevelUpModalOpen && <LevelUpModal />}
		</ChallengesContext.Provider>
	);

}
