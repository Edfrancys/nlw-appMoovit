import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import { CountdownContext } from '../context/CountdownContext';

import styles from '../styles/components/Chalengebox.module.css'

export function Chalengebox() {

    const { stopCountdown } = useContext(CountdownContext)

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)

    function handleChallengeSuccess() {
        completeChallenge();
        stopCountdown();
    }
    function handleChallengeFail() {
        resetChallenge();
        stopCountdown();
    }
    
    return (
        <div className={styles.challengeBoxContainer} >
            { activeChallenge ? (
                <>
                <div className={styles.challengeActive} >
                    <header>Ganhe {activeChallenge.amount} XP</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type='button'
                            className={ styles.challengeFailedButton }
                            onClick={ handleChallengeFail }
                        >
                            Failed
                        </button>
                        <button 
                            type='button'
                            className={ styles.challengeSuccessButton }
                            onClick={ handleChallengeSuccess }
                        >
                            Success
                        </button>
                    </footer>
                </div>
                </>
            ) : (
                    <>
                        <div className={styles.challengeeNotActive} >
                            <strong>
                                Inicie um ciclo para
                                <br />receber desafios a
                                <br />serem completados.
                            </strong>
                            <p>
                                <img src='icons/level-up.svg' alt='Level Up' />
                                    Complete os desafíos e avance
                                    <br />para o proximo level.
                                </p>
                        </div>
                    </>
                )}
        </div>
    )
}