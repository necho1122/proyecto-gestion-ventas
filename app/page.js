'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();
		setMessage('');

		try {
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, action: 'login' }),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.error);

			setMessage('Inicio de sesión exitoso.');
			router.push('/home'); // Redirigir a /home
		} catch (error) {
			setMessage('Usuario o contraseña incorrectos.');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.formWrapper}>
				<h1>Inicio de Sesión</h1>
				<Image
					src='/logo.png'
					alt='Logo'
					width={200}
					height={70}
				/>
				<form onSubmit={handleLogin}>
					<div>
						<label>Email:</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Contraseña:</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type='submit'>Iniciar Sesión</button>
				</form>
				{message && <p className={styles.message}>{message}</p>}
				<Link
					href='/reset-password'
					className={styles.link}
				>
					¿Olvidaste tu contraseña?
				</Link>
			</div>
		</div>
	);
}
