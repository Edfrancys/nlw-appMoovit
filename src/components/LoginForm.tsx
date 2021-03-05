import { FaGithub, FaAngleRight } from 'react-icons/fa'
import styles from '../styles/components/LoginForm.module.css'

export default function LoginForm() {
    return (
        <>
            <main className={styles.containerLoginForm}>
                <h2>Bem-vindo!</h2>
                <div>
                    <FaGithub />
                    <p>Para começar faça seu login com umas das redes sociais abaixo.</p>
                </div>
                <form className={styles.formLoginGithub}>
                    <input 
                        name='loginGithub'
                        placeholder='Digite seu username'
                    />
                    <button> <FaAngleRight /> </button>
                </form>
            </main>
        </>
    )
}