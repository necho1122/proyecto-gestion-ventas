import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

function Page() {
	return (
		<div className={styles.container}>
			<h1>Opciones de usuario</h1>
			<div className={styles.linkContainer}>
				<Link
					href='/'
					className={styles.link}
				>
					Iniciar Sesión
				</Link>
				<Link
					href='/reset-password'
					className={styles.link}
				>
					Cambiar Contraseña
				</Link>
			</div>
		</div>
	);
}

export default Page;
