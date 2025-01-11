'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

function page() {
	const [services, setServices] = useState([]); // Define el estado en el componente

	const obtenerVentas = async () => {
		try {
			const response = await fetch('/api/getServices', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setServices(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		obtenerVentas();
	}, []);

	return (
		<div className={styles.serviceContainer}>
			<h1>Servicios</h1>
			<table>
				<thead>
					<tr>
						<th>Servicio</th>
						<th>Precio Unitario</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service, index) => (
						<tr key={index}>
							<td>{service.servicio}</td>
							<td>{service.precio}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default page;
