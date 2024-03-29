/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import Link from 'next/link';
import { FaHome, FaMedal } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import styles from '../styles/components/BarNavigation.module.css';
import { AuthContext } from '../context/AuthContext';

export function BarNavigation (): JSX.Element {

	const { logout } = useContext(AuthContext);

	return (		
		<div className={styles.containerBar}>
			<img src='icon-moveit.svg' alt='Logo Moveit' />

			<div className={styles.listBar}>

				<Link href='/moveit'>
					<a>
						<div>
							<div />
							<FaHome />
						</div>
					</a>
				</Link>

				<Link href='/leaderboard'>
					<a>
						<div>
						
							<div style={{ background: 'none' }} />
							<FaMedal style={{ color: 'gray' }}/>
						
						</div>
					</a>
				</Link>

			</div>

			<Link href='#'>
				<a onClick={logout} className={styles.loggoutButton}>
					<ImExit />
				</a>
			</Link>
			
		</div>		
	);
}