'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { DeleteIcon, HomeIcon } from '@/components/Icons';

function ListaClientes() {
	const [customers, setCustomers] = useState([]); // Estado para los clientes filtrados
	const [allCustomers, setAllCustomers] = useState([]); // Estado para todos los clientes
	const [message, setMessage] = useState(null);

	// Función para obtener clientes desde Firebase
	const getCustomers = async () => {
		try {
			const response = await fetch('/api/getCustomers', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los clientes');
			const data = await response.json();
			setCustomers(data); // Actualiza el estado con los datos filtrados
			setAllCustomers(data); // Almacena todos los clientes en un estado separado
		} catch (error) {
			console.error(error.message);
		}
	};

	const deleteCustomer = async (id) => {
		// Mostrar alerta de confirmación
		const confirmDelete = window.confirm(
			'¿Estás seguro de que deseas eliminar este cliente?'
		);

		if (!confirmDelete) return; // Si el usuario cancela, no se ejecuta la eliminación

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

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();
		if (searchValue === '') {
			setCustomers(allCustomers); // Si no hay texto de búsqueda, muestra todos los clientes
		} else {
			const filteredCustomers = allCustomers.filter((customer) =>
				customer.cliente
					.toLowerCase()
					.slice(0, searchValue.length)
					.includes(searchValue)
			);
			setCustomers(filteredCustomers); // Muestra los clientes filtrados
		}
	};

	return (
		<div className={styles.customersContainer}>
			<Link href='/home'>
				<HomeIcon />
			</Link>
			<h1 className={styles.title}>Lista de Clientes</h1>
			<div className={styles.searchContainer}>
				<input
					type='text'
					placeholder='Buscar cliente'
					className={styles.searchInput}
					onChange={handleSearch} // Ejecuta la búsqueda al escribir
				/>
			</div>

			<Link
				href='/customers/addCustomer'
				style={{
					marginTop: '1rem',
					marginBottom: '1rem',
					display: 'block',
					textAlign: 'center',
					color: '#1a73e8',
				}}
			>
				Agregar Cliente
			</Link>
			{message && <p className={styles.message}>{message}</p>}
			<div className={styles.cardsContainer}>
				{customers.map((cliente) => (
					<div
						key={cliente.id}
						className={styles.customerCard}
					>
						<h2 className={styles.customerName}>{cliente.cliente}</h2>
						<p className={styles.detail}>
							<strong>Cédula:</strong> {cliente.cedula}
						</p>
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
		</div>
	);
}

export default ListaClientes;
