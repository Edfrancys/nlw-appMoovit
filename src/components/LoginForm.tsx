/* eslint-disable react/react-in-jsx-scope */
import { useForm } from 'react-hook-form';
import { FaGithub, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/components/LoginForm.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginForm(): JSX.Element{

	const [disableButton, setDisableButton] = useState(false);
	const { signInGithub } = useContext(AuthContext);

	const { register, handleSubmit, errors } = useForm();

	const loginSubmit = (data) => {
		signInGithub(data);
	};  	

	function changeButton () {
		setDisableButton(true);
	}

	return (
		<>
			<main className={styles.containerLoginForm}>
				<h2>Bem-vindo!</h2>
				<div>
					<FaGithub />
					<p>Para começar faça seu login com umas das redes sociais abaixo.</p>
				</div>
				<form className={styles.formLoginGithub} onChange={changeButton}>
					<input 
						name='loginGithub'
						placeholder='Digite seu username'
						ref={
							register({ 
								required: true 
							})
						}
					/>
					{errors.loginGithub && <span>Preencha corretamente. Você precisa fazer login para usar este App.</span>}
					{disableButton ? (
						<button  type='submit' onClick={handleSubmit(loginSubmit)}> <FaAngleRight /> </button>
					) : (
						<button disabled type='submit' onClick={handleSubmit(loginSubmit)}> <FaAngleRight /> </button>
					)}
					

					
				</form>
			</main>
		</>
	);
}