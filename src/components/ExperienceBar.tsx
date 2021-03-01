import { useContext } from 'react'
import { ChallengesContext } from '../context/ChallengesContext'
import styles from  '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {

    const { currenceExpirience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round((currenceExpirience * 100) / experienceToNextLevel)

    return (
        <>            
            <header className={styles.experienceBar}>
                <span>0 xp</span>
                <div>
                    <div style={{ width: `${percentToNextLevel}%` }} />
                    <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currenceExpirience} xp</span>
                </div>
                <span>{experienceToNextLevel} xp</span>
            </header>                        
        </>
    )
}