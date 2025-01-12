'use client';
import React from 'react';
import styles from './SellsAndStock.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function sellsAndStock() {
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

	const ventasSlice = ventas.slice(0, 6);

	return (
		<div className={styles.sellsAndStock}>
			<div className={styles.sellsAndStock__links}>
				<Link href='/sell-stock/sell'>
					<h2>Vender</h2>
				</Link>
				<Link href='/sell-stock/stock'>
					<h2>Inventario</h2>
				</Link>
			</div>
			<div>
				<h3>Ventas recientes</h3>
				<ul>
					{ventasSlice.map((venta, index) => (
						<li key={index}>
							<Image
								src='https://cdn-icons-png.flaticon.com/512/8221/8221097.png'
								alt='Venta'
								width={20}
								height={20}
							/>{' '}
							<span>{venta.nombre}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default sellsAndStock;
