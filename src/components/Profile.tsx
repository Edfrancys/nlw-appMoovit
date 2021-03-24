/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile (): JSX.Element {

	const { level } = useContext(ChallengesContext);
	const { user, load } = useContext(AuthContext);	

	if(load === true) {
		return <h1>Carregando seus dados...</h1>;
	}

	return (
		<>
			<div className={ styles.profileContainer}>
				<img src={user.avatar_url} alt={user.name} />
				<div>
					<strong>{user.name}</strong>
					<p>
						<img src="icons/level.svg" alt="Level"/>
                        Level {level}
					</p>
				</div>
			</div>
		</>
	);
}