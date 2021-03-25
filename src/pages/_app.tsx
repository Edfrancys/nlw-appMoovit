/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { AuthProvider } from '../context/AuthContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {

	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
