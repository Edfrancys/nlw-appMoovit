/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import { ProfileContext, UserData } from '../context/ProfileContext';
import styles from '../styles/components/Profile.module.css';

export function Profile (): JSX.Element {

	const { level } = useContext(ChallengesContext);
	const { userData }:any = useContext(ProfileContext);	

	return (
		<>
			<div className={ styles.profileContainer}>
				<img src={userData.avatar_url} alt={userData.name} />
				<div>
					<strong>{userData.name}</strong>
					<p>
						<img src="icons/level.svg" alt="Level"/>
                        Level {level}
					</p>
				</div>
			</div>
		</>
	);
}