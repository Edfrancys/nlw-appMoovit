import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
	apiKey: 'AIzaSyAqAxeVnAiXGQgN_g93CPVBUCeVumBkPWo',
	authDomain: 'appdev-4ca77.firebaseapp.com',
	projectId: 'appdev-4ca77',
	storageBucket: 'appdev-4ca77.appspot.com',
	messagingSenderId: '558999306472',
	appId: '1:558999306472:web:f12ad8cb4fd50a2a64495d',
	measurementId: 'G-V8TZ9Q3T1M'
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
