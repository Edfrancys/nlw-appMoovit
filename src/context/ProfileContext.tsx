/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, ReactNode, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface UserData {
    name: string
    avatar_url: string
}

interface ProfileContextData {
    userData: object
    loginGitHub(data: LoginData): Promise<void>,
}

interface LoginData {
    loginGithub: string
}

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileContext = createContext({} as ProfileContextData);

export function ProfileProvider({ children }: ProfileProviderProps) {

	const Router = useRouter();

	const [userData, setUserData] = useState({}as UserData);
	
	useEffect(() => {		       
		!userData.name && Router.push('/');
	},[]);


	async function loginGitHub(data: LoginData) {
		const lowName = String(data.loginGithub).toLowerCase();		        
		const userDataGit = await fetch(`https://api.github.com/users/${lowName}`)			
			.then(res => {
				return res.json();				
			})
			.catch(e => {
				console.log(e);
			});
		
		if (userDataGit){
			setUserData(userDataGit);
			Router.push('/moveit');
		}            
	}

	return (
		<ProfileContext.Provider value={{
			userData,
			loginGitHub
		}}
		>
			{ children}
		</ProfileContext.Provider>
	);
}