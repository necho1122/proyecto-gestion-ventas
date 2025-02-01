'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { HomeIcon } from '@/components/Icons';

function SellStockPage() {
	const [ventas, setVentas] = useState([]); // Define el estado en el componente

	const obtenerVentas = async () => {
		try {
			const response = await fetch('/api/getStocksData', { method: 'GET' });
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

	// Lista de colores de fondo
	const colors = ['lightcoral', 'lightblue', 'lightgreen'];

	return (
		<div className={styles.toSellContainer}>
			<Link href='/home'>
				<HomeIcon />
			</Link>
			<h1 className={styles.title}>Productos a la Venta</h1>
			<div className={styles.productsToSellContainer}>
				{ventas.map((product, index) => (
					<div key={index}>
						<Link
							href={`/sell-stock/sell/${product.id}`}
							className={styles.productLink}
						>
							<div
								className={styles.productToSell}
								style={{ backgroundColor: colors[index % colors.length] }}
							>
								<h4 className={styles.productName}>{product.producto}</h4>
								<p className={styles.productPrice}>
									Precio unitario:{' '}
									<strong>
										${parseFloat(product.precioUnitario).toFixed(2)}
									</strong>
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>
			<Link
				href='/preSells'
				className={styles.backButton}
			>
				Ir a la lista
			</Link>
		</div>
	);
}

export default SellStockPage;
