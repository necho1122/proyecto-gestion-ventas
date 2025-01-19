import {
	getAuth,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { NextResponse } from 'next/server';

// Configuración de Firebase
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manejo de métodos HTTP
export async function POST(request) {
	const body = await request.json();
	const { email, password, action } = body;

	if (!email) {
		return NextResponse.json(
			{ error: 'El email es obligatorio' },
			{ status: 400 }
		);
	}

	try {
		if (action === 'login') {
			if (!password) {
				return NextResponse.json(
					{ error: 'La contraseña es obligatoria' },
					{ status: 400 }
				);
			}

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return NextResponse.json({
				message: 'Inicio de sesión exitoso',
				user: userCredential.user,
			});
		}

		if (action === 'reset') {
			await sendPasswordResetEmail(auth, email);
			return NextResponse.json({
				message: 'Correo de recuperación enviado con éxito',
			});
		}

		return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
