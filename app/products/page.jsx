'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

function Page() {
	const [productos, setProductos] = useState([]);

	const obtenerProductos = async () => {
		try {
			const response = await fetch('/api/getStocksData', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los productos');
			const data = await response.json();
			setProductos(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		obtenerProductos();
	}, []);

	return (
		<div className={styles.productsContainer}>
			<h1>Nuestros Productos</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Precio Unitario</th>
					</tr>
				</thead>
				<tbody>
					{productos.map((product, index) => {
						// Verificar y convertir precioUnitario a número
						const precioUnitario = parseFloat(product.precioUnitario) || 0;

						return (
							<tr key={index}>
								<td>{product.producto}</td>
								<td>${precioUnitario.toFixed(2)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Page;
