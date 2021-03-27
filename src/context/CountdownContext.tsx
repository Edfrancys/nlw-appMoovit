/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasfinisher: boolean,
    isActive: boolean,
    startCountdown: () => void,
    stopCountdown: () => void
}
interface CountdownProdiverProps {
    children: ReactNode
}
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProdiverProps) {

	let countdownTimeout: NodeJS.Timeout;

	const timeInicial = 0.05;

	const { startNewChallenge } = useContext(ChallengesContext);

	const [time, setTime] = useState(timeInicial * 60);
	const [isActive, setIsActive] = useState(false);
	const [hasfinisher, setHasFinisher] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	function startCountdown() {
		setIsActive(true);
	}

	function stopCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setHasFinisher(false);
		setTime(timeInicial * 60);
	}

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		} else if (isActive && time === 0) {
			setHasFinisher(true);
			setIsActive(false);
			startNewChallenge();
		}
	}, [isActive, time]);

	return (
		<CountdownContext.Provider value={{
			minutes,
			seconds,
			hasfinisher,
			isActive,
			startCountdown,
			stopCountdown
		}}>
			{children}
		</CountdownContext.Provider>
	);
}