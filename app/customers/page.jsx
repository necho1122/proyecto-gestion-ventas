'use client';

import React from 'react';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

function ListaClientes() {
	const [customers, setCustomers] = useState([]); // Define el estado en el componente

	const getCustomers = async () => {
		try {
			const response = await fetch('/api/getCustomers', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setCustomers(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getCustomers();
	}, []);
	return (
		<div className={styles.customersContainer}>
			<h1 className={styles.title}>Lista de Clientes</h1>
			<div className={styles.cardsContainer}>
				{customers.map((cliente) => (
					<div
						key={cliente.id}
						className={styles.customerCard}
					>
						<h2 className={styles.customerName}>{cliente.cliente}</h2>
						<p className={styles.detail}>
							<strong>Teléfono:</strong> {cliente.teléfono}
						</p>
						<p className={styles.detail}>
							<strong>Email:</strong>{' '}
							<a
								href={`mailto:${cliente.email}`}
								className={styles.emailLink}
							>
								{cliente.email}
							</a>
						</p>
						<p className={styles.detail}>
							<strong>Dirección:</strong> {cliente.direccion}
						</p>
						<p className={styles.detail}>
							<strong>Empresa:</strong> {cliente.empresa}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListaClientes;
