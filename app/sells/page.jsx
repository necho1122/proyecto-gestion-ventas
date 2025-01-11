'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

function Page() {
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

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Control de Ventas</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad</th>
						<th>Precio Unitario</th>
						<th>Precio Total</th>
						<th>Fecha</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{ventas.map((product, index) => {
						// Convertir la fecha a formato YYYY-MM-DD
						const fechaFormateada = new Date(product.fecha)
							.toISOString()
							.split('T')[0];

						return (
							<tr key={index}>
								<td>{product.nombre}</td>
								<td>{product.cantidad}</td>
								<td>${product.precioUnitario}</td>
								<td>${product.precioTotal}</td>
								<td>{fechaFormateada}</td> {/* Mostrar la fecha formateada */}
								<td>
									<button className={styles.actionButton}>Acción</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Page;
