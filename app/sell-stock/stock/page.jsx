'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

function Page() {
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

	return (
		<div className={styles.container}>
			<div>
				<h1 className={styles.heading}>Lista de Inventario</h1>
				<Link href='/addItem'>
					<button className={styles.addButton}>Agregar nuevo producto</button>
				</Link>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad</th>
						<th>Precio Unitario</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{ventas.map((product, index) => (
						<tr key={index}>
							<td>{product.producto}</td>
							<td>{product.cantidad}</td>
							<td>${product.precioUnitario}</td>
							<td>
								<button className={styles.actionButton}>Acción</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Page;
