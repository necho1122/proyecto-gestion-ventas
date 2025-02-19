'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { HomeIcon } from '@/components/Icons';

function Page() {
	const [services, setServices] = useState([]);

	const obtenerServicios = async () => {
		try {
			const response = await fetch('/api/getServices', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los servicios');
			const data = await response.json();
			setServices(data);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		obtenerServicios();
	}, []);

	return (
		<div className={styles.serviceContainer}>
			<Link
				href='/home'
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<HomeIcon /> <p style={{ marginLeft: '10px' }}>Ir a inicio</p>
			</Link>
			<h1>Servicios</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Servicio</th>
						<th>Precio Unitario</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service, index) => {
						// Verificar y convertir precio a número
						const precio = parseFloat(service.precio) || 0;

						return (
							<tr key={index}>
								<td>{service.servicio}</td>
								<td>${precio.toFixed(2)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Page;
