/* eslint-disable linebreak-style */
import React, { createContext, ReactNode, useState, useEffect} from 'react';
import { useRouter } from 'next/router';

import { db } from '../hooks/firebase';
import Cookie from 'js-cookie';



interface AuthContextData {
	user: UserDataGit | null
	experienceData: ExperienceData | null
	load: boolean
    signInGithub: (data: AuthGithub) => void
	logout: () => void
    error: ErrorIt
}

interface ErrorIt {
    error: boolean
    message: string
}

interface ExperienceData {
	level: number
	currenceExpirience: number
	challengesComplete: number
}

interface AuthGithub {
    loginGithub: string
}

interface AuthProviderProps {
    children?: ReactNode
}

interface UserDataGit {
    name: string
    avatar_url: string
    node_id: string
    message?: string
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: AuthProviderProps) => {

	const Router = useRouter();

	const [user, setUser] = useState<UserDataGit | null>(null);
	const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
	const [load, setLoad] = useState<boolean>(true);
	const [error, setError] = useState({error: false} as ErrorIt);

	useEffect(() => {
		const loadStorageData = () => {
			const storageUser = localStorage.getItem('@MoveIt:user');
			const objUser = JSON.parse(storageUser);
			if (storageUser) {
				setUser(objUser);
				setLoad(false);									
			} else {
				setLoad(true);
				Router.push('/');
			}
		};
		loadStorageData();				
	}, []);

	async function  signInGithub (data: AuthGithub) {
		console.log(data.loginGithub);
		const lowName = String(data.loginGithub).toLowerCase();		        
		const userDataGit: UserDataGit = await fetch(`https://api.github.com/users/${lowName}`)			
			.then(res => {
				return res.json();				
			})
			.catch(e => {
				console.log(e);
			});
		
		if (userDataGit){			
			if (userDataGit.message === 'Not Found') { 
				
				console.log(userDataGit.message);
				setError({
					error: true,
					message: 'Usuario não encontrado no servidor do GitHub'
				});
			} else getUserFirestore(userDataGit);                  
		}        
	}

	async function getUserFirestore (data: UserDataGit) {

		const objUserGit = {name: data.name, avatar_url: data.avatar_url, node_id: data.node_id};
		const objExpirenceUser = {
			level: 1,
			currenceExpirience: 0,
			challengesComplete: 0
		};

		db.collection('users')
			.doc(data.node_id)
			.get()
			.then((userData) => {

				const getData = userData.data();

				console.log('If user Reg', getData);

				if (getData === undefined) { 
					db.collection('users')
						.doc(data.node_id)
						.set(objUserGit)
						.then(() => {
							setUser(objUserGit);
							localStorage.setItem('@MoveIt:user', JSON.stringify(objUserGit));
							console.log('userSet', 'Usuario salvo e logado no Firebase e Localstorage');
							setLoad(false);
							Router.push('/moveit');
						});
					db.collection('experience')
						.doc(data.node_id)
						.set(objExpirenceUser)
						.then((resExperience)=>{
							console.log(resExperience);
							Cookie.set('level', String(objExpirenceUser.level), { expires: 1 });
							Cookie.set('currenceExpirience', String(objExpirenceUser.currenceExpirience), { expires: 1 });
							Cookie.set('challengesComplete', String(objExpirenceUser.challengesComplete), { expires: 1 });
							
						});
				} else {
					setUser(objUserGit);
					localStorage.setItem('@MoveIt:user', JSON.stringify(objUserGit));
					console.log('userSet', 'Usuario salvo e logado no Firebase e Localstorage');
					
					db.collection('experience')
						.doc(data.node_id)
						.get()
						.then((res) => {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const getData: any = res.data();
							console.log('If exist User',getData);
							
							setExperienceData(getData);
							Cookie.set('level', String(getData.level), { expires: 1 });
							Cookie.set('currenceExpirience', String(getData.currenceExpirience), { expires: 1 });
							Cookie.set('challengesComplete', String(getData.challengesComplete), { expires: 1 });
						});
					
					setLoad(false);
					Router.push('/moveit');
				}							
					
			});							
	}

	const logout = () => {
		setUser(null);
		setLoad(true);
		localStorage.clear();
		Router.push('/');
	};

	return (
		<AuthContext.Provider value={{
			signInGithub,
			logout,
			user,
			experienceData,
			load,
			error
		}}>
			{ children }
		</ AuthContext.Provider>
	);
};