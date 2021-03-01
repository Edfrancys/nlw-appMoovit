import { useContext } from 'react'
import { ChallengesContext } from '../context/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile () {

    const { level } = useContext(ChallengesContext)

    return (
        <>
            <div className={ styles.profileContainer}>
                <img src='https://github.com/edfrancys.png' alt='Edfrancys Azevedo' />
                <div>
                    <strong>Edfrancys Azevedo</strong>
                    <p>
                        <img src="icons/level.svg" alt="Level"/>
                        Level {level}
                    </p>
                </div>
            </div>
        </>
    )
}