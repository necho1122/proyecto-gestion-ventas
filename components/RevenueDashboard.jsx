import React from 'react';
import styles from './RevenueDashboard.module.css';
import Image from 'next/image';

function RevenueDashboard() {
	return (
		<div className={styles.revenueDashboard}>
			<h2>Consolidado de Ventas</h2>
			<span>
				<p>
					<strong>Fecha de corte:</strong> 31/12/2021
				</p>
				<p>
					<strong>Total de ventas:</strong> $ 1,000,000
				</p>
			</span>
			<Image
				src='https://cdn-icons-png.flaticon.com/512/3281/3281306.png'
				alt='Grafico de barras'
				width={250}
				height={220}
			/>
		</div>
	);
}

export default RevenueDashboard;
