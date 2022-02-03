import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/components/LoginForm.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm: React.FC = () =>  {

	const [disableButton, setDisableButton] = useState(false);
	const { signInGithub, error } = useContext(AuthContext);

	const { register, handleSubmit } = useForm();

	const loginSubmit = (data) => {
		signInGithub(data);
	};

	function changeButton() {
		setDisableButton(true);
	}

	return (
		<>
			<main className={styles.containerLoginForm}>
				<h2>Bem-vindo!</h2>
				<div>
					<FaGithub />
					<p>Para começar faça seu login, com seu nome de usuário do GitHub.</p>
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

					{disableButton ? (
						<button type='submit' onClick={handleSubmit(loginSubmit)}> <FaAngleRight /> </button>
					) : (
						<button disabled type='submit' onClick={handleSubmit(loginSubmit)}> <FaAngleRight /> </button>
					)}

				</form>
				{error.error === true && <span>{error.message},<br /> Preencha corretamente seu username.</span>}
				{/* {errors.loginGithub && <span>Preencha corretamente. Você precisa fazer login para usar este App.</span>} */}
			</main>
		</>
	);
};

export default LoginForm;