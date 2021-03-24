import React, { createContext, ReactNode, useState, useEffect} from 'react';
import { useRouter } from 'next/router';

import { db } from '../hooks/firebase';



interface AuthContextData {
	user: UserDataGit | null
	load: boolean
    signInGithub: (data: AuthGithub) => void
	logout: () => void
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
	const [load, setLoad] = useState<boolean>(true);

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
			userDataGit.message === 'Not Found' ? console.log(userDataGit.message) : getUserFirestore(userDataGit);                  
		}        
	}

	async function getUserFirestore (data: UserDataGit) {

		const objUserGit = {name: data.name, avatar_url: data.avatar_url, node_id: data.node_id};

		db.collection('users')
			.doc(data.node_id)
			.get()
			.then((userData) => {
				const getData = userData.data();

				if (getData === undefined) { 
					db.collection('users')
						.doc(data.node_id)
						.set(objUserGit)
						.then((resData) => {
							console.log(resData);	
							setUser(objUserGit);
							localStorage.setItem('@MoveIt:user', JSON.stringify(objUserGit));
							console.log('userSet', 'Usuario salvo e logado no Firebase e Localstorage');
							setLoad(false);
							Router.push('/moveit');
						});
				} else {
					setUser(objUserGit);
					localStorage.setItem('@MoveIt:user', JSON.stringify(objUserGit));
					console.log('userSet', 'Usuario salvo e logado no Firebase e Localstorage');
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
			load
		}}>
			{ children }
		</ AuthContext.Provider>
	);
};