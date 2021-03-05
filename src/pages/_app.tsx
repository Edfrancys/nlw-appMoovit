/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ProfileProvider } from '../context/ProfileContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {

	return (
		<ProfileProvider>
			<Component {...pageProps} />
		</ProfileProvider>
	);
}

export default MyApp;
