'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ResetPassword() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setMessage('');

		try {
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, action: 'reset' }),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.error);

			setMessage('Correo de recuperación enviado.');
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.formWrapper}>
				<h1>Recuperar Contraseña</h1>
				<form onSubmit={handlePasswordReset}>
					<div>
						<label>Email:</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<button type='submit'>Enviar Correo</button>
				</form>
				{message && <p className={styles.message}>{message}</p>}
			</div>
		</div>
	);
}
