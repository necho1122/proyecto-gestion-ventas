'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

function Page() {
	const [ventas, setVentas] = useState([]); // Estado para almacenar las ventas

	// Obtener ventas desde la API
	const obtenerVentas = async () => {
		try {
			const response = await fetch('/api/getSellsData', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setVentas(data); // Actualizar el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		obtenerVentas();
	}, []);

	// Calcular el monto total de cada venta (sumar precios totales de los productos)
	const calcularMontoTotal = (productos) => {
		if (!Array.isArray(productos)) {
			console.warn('Productos no es un array:', productos);
			return 0; // Retornar 0 si productos no es un array
		}
		return productos.reduce((total, producto) => {
			// Convertir precioTotal a número antes de sumarlo
			const precioTotal = parseFloat(producto.precioTotal) || 0;
			return total + precioTotal;
		}, 0);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Control de Ventas</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID de la Compra</th>
						<th>Fecha y Hora</th>
						<th>Monto Total</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{ventas.map((venta) => {
						// Convertir la fecha y hora a formato legible
						const fechaFormateada = new Date(venta.fecha).toLocaleString();

						return (
							<tr key={venta.id}>
								<td>{venta.id}</td> {/* Mostrar el ID de la compra */}
								<td>{fechaFormateada}</td> {/* Fecha y hora */}
								<td>${calcularMontoTotal(venta.productos).toFixed(2)}</td>{' '}
								{/* Monto total */}
								<td>
									<Link href={`/sells/${venta.id}`}>
										<button className={styles.actionButton}>
											Ver Detalles
										</button>
									</Link>
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
