import LoginForm from '../components/LoginForm'
import styles from '../styles/pages/Home.module.css'

export default function Index() {
    return (
        <div className={styles.homeContainer}> 
            <section >
                <div className={styles.iconImg}>
                    <img src='icon-moveit.svg' alt='logo Movi.it' />
                </div>
                <div className={styles.loginForm}>
                    <header>
                        <img src='logo-moveit.svg'  alt='logo moveit' style={{ width: '10rem' }}/>
                    </header>
                    <LoginForm />
                </div>
            </section>
        </div>
    )    
}
