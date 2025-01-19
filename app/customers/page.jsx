'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { DeleteIcon } from '@/components/Icons';

function ListaClientes() {
	const [customers, setCustomers] = useState([]); // Estado para los clientes
	const [message, setMessage] = useState(null);

	// Función para obtener clientes desde Firebase
	const getCustomers = async () => {
		try {
			const response = await fetch('/api/getCustomers', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los clientes');
			const data = await response.json();
			setCustomers(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	// Función para eliminar un cliente
	const deleteCustomer = async (id) => {
		try {
			const response = await fetch(`/api/deleteCustomer`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (!response.ok) {
				throw new Error('Error al eliminar el cliente');
			}

			// Actualizar la lista de clientes
			setCustomers((prev) => prev.filter((customer) => customer.id !== id));
			setMessage('Cliente eliminado con éxito.');
		} catch (error) {
			console.error(error.message);
			setMessage('Error al eliminar el cliente.');
		}
	};

	useEffect(() => {
		getCustomers();
	}, []);

	return (
		<div className={styles.customersContainer}>
			<h1 className={styles.title}>Lista de Clientes</h1>
			{message && <p className={styles.message}>{message}</p>}
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
						<button
							className={styles.deleteButton}
							onClick={() => deleteCustomer(cliente.id)}
						>
							<DeleteIcon />
						</button>
					</div>
				))}
			</div>
			<Link
				href='/customers/addCustomer'
				style={{
					marginTop: '1rem',
					display: 'block',
					textAlign: 'center',
					color: '#1a73e8',
				}}
			>
				Agregar Cliente
			</Link>
		</div>
	);
}

export default ListaClientes;
