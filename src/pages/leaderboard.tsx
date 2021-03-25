import React from 'react';
import { BarNavigation } from '../components/BarNavigation';
import styles from '../styles/pages/Leaderboard.module.css';

export default function Leaderboard(): JSX.Element {
	return (
		<>
			<BarNavigation />
			<div className={styles.containerLeader}>
				<h1>Leaderboard</h1>
				<div className={styles.listLeader}>					
					<p>Posição</p>
					<p>Usuário</p>
					<p>Desafios</p>
					<p>Experiência</p>
				</div>

				<div className={styles.listLeader}>
					<div>1</div>
					<div>						
						<img src='' alt='' />
						<div>
							<strong>Edfrancys Azevedo</strong>
							<p>
								<img src="icons/level.svg" alt="Level"/>
                                        Level 2
							</p>
						</div>						
					</div>
					<div> 127 Completados </div>
					<div> 1540000 Exp </div>
				</div>

				<div className={styles.listLeader}>
					<div>1</div>
					<div className={styles.userAvatar}>						
						<img src='' alt='' />
						<div>
							<strong>Edfrancys Azevedo</strong>
							<p>
								<img src="icons/level.svg" alt="Level"/>
                                        Level 2
							</p>
						</div>						
					</div>
					<div> 127 Completados </div>
					<div> 1540000 Exp </div>
				</div>
			</div>
			
		</>
	);
}