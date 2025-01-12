'use client';
import React from 'react';
import styles from './RevenueDashboard.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function RevenueDashboard() {
	const [ventas, setVentas] = useState([]); // Define el estado en el componente

	const obtenerVentas = async () => {
		try {
			const response = await fetch('/api/getSellsData', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setVentas(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		obtenerVentas();
	}, []);

	const sumaPrecioTotal = ventas.reduce(
		(acumulador, ventas) => acumulador + parseFloat(ventas.precioTotal),
		0
	);

	return (
		<div className={styles.revenueDashboard}>
			<h2>Consolidado de Ventas</h2>
			<span>
				<p>
					<strong>Fecha de corte:</strong> 2025/01/11
				</p>
				<p>
					<strong>Total de ventas:</strong> $ {sumaPrecioTotal.toFixed(2)}
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
