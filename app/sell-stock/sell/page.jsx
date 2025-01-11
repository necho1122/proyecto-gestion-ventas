'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

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
			<h1>Productos a la venta</h1>
			<div className={styles.productsToSellContainer}>
				{ventas.map((product, index) => (
					<div key={index}>
						<Link
							href={`/sell-stock/sell/${product.id}`}
							style={{
								backgroundColor: colors[index % colors.length],
								padding: '10px',
								borderRadius: '5px',
								textDecoration: 'none',
								display: 'block',
							}}
						>
							<div className={styles.productToSell}>
								<h4>{product.producto}</h4>
								<p>Precio unitario: ${product.precioUnitario}</p>
							</div>
						</Link>
					</div>
				))}
			</div>
			<Link href='/preSells'>Ir a la lista</Link>
		</div>
	);
}

export default SellStockPage;
