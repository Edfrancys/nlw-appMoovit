/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/CountDown.module.css';

export function CountDown(): JSX.Element {

	const { 
		minutes,
		seconds,
		hasfinisher,
		isActive,
		startCountdown,
		stopCountdown
	} = useContext(CountdownContext);

	const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
	const [secondsLeft, secondsRigth] = String(seconds).padStart(2, '0').split('');
    
	return (
		<>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRigth}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondsLeft}</span>
					<span>{secondsRigth}</span>
				</div>
			</div>

			{hasfinisher ? (
				<button
					disabled
					type='button'
					className={styles.countdownButton}                    
				>
                    Ciclo Encerrado
				</button>
			) : (
				<>
					{!isActive ? (
						<button
							type='button'
							className={styles.countdownButton}
							onClick={startCountdown}
						>
                        Iniciar Ciclo
						</button>
					) : (
						<button
							type='button'
							className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
							onClick={stopCountdown}
						>
                            Parar Ciclo
						</button>
					)}
				</>

			)}

            



		</>

	);
}