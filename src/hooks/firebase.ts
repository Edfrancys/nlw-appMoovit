import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
	apiKey: process.env.APY_KEY,
	authDomain: process.env.API_DOMAIN,
	projectId: process.env.API_PROTECT_ID,
	storageBucket: process.env.API_STORAGE,
	messagingSenderId: process.env.API_MESSAGE,
	appId: process.env.API_ID,
	measurementId: process.env.API_MEASUREMENT
};

if(!firebase.apps.length){
	firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();

export { auth, db, now, storage, firebase };

console.log( app.name ? `Firebase ${app.name} ativado com sucesso` : 'Ops! Erro ao conectar ao firebase');
