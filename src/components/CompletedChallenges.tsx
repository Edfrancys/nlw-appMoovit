import { useContext } from 'react'
import { ChallengesContext } from '../context/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompleteChallenges () {

    const { challengesComplete } = useContext(ChallengesContext)

    return (
        <div className={ styles.completedChalengesContainer}>
            <span>Desafions Completos</span>
            <span>{challengesComplete}</span>
        </div>
    )
}