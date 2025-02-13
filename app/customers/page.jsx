'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { DeleteIcon, HomeIcon } from '@/components/Icons';

function ListaClientes() {
	const [customers, setCustomers] = useState([]); // Clientes filtrados
	const [allCustomers, setAllCustomers] = useState([]); // Todos los clientes
	const [message, setMessage] = useState(null);

	// Obtener clientes desde Firebase
	const getCustomers = async () => {
		try {
			const response = await fetch('/api/getCustomers', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los clientes');
			const data = await response.json();
			setCustomers(data);
			setAllCustomers(data);
		} catch (error) {
			console.error(error.message);
			setMessage('Error al cargar los clientes.');
		}
	};

	const deleteCustomer = async (id) => {
		if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente?'))
			return;

		try {
			const response = await fetch(`/api/deleteCustomer`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (!response.ok) throw new Error('Error al eliminar el cliente');

			setCustomers((prev) => prev.filter((customer) => customer.id !== id));
			setAllCustomers((prev) => prev.filter((customer) => customer.id !== id)); // Asegurar que se elimine de ambos estados
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
		const searchValue = e.target.value.replace(/\D/g, '').trim(); // Solo números

		if (searchValue === '') {
			setCustomers(allCustomers);
			return;
		}

		const filteredCustomers = allCustomers.filter(
			(customer) => customer.cedula && customer.cedula.startsWith(searchValue) // Verifica que cedula existe
		);

		setCustomers(filteredCustomers);
	};

	return (
		<div className={styles.customersContainer}>
			<Link href='/home'>
				<HomeIcon />
			</Link>
			<h1 className={styles.title}>Lista de Clientes</h1>

			<div className={styles.searchContainer}>
				<input
					type='number'
					placeholder='Buscar cliente por cédula'
					className={styles.searchInput}
					onChange={handleSearch}
					onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))} // Solo números
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
				{customers.length > 0 ? (
					customers.map((cliente) => (
						<div
							key={cliente.id}
							className={styles.customerCard}
						>
							<h2 className={styles.customerName}>{cliente.cliente}</h2>
							<p className={styles.detail}>
								<strong>Cédula:</strong> {cliente.cedula}
							</p>
							<p className={styles.detail}>
								<strong>Teléfono:</strong> {cliente.teléfono || 'No disponible'}
							</p>
							<p className={styles.detail}>
								<strong>Email:</strong>{' '}
								{cliente.email ? (
									<a
										href={`mailto:${cliente.email}`}
										className={styles.emailLink}
									>
										{cliente.email}
									</a>
								) : (
									'No disponible'
								)}
							</p>
							<p className={styles.detail}>
								<strong>Dirección:</strong>{' '}
								{cliente.direccion || 'No disponible'}, {cliente.nrocasa || ''},{' '}
								{cliente.ciudad || ''}, {cliente.provincia || ''},{' '}
								{cliente.pais || ''}
							</p>
							<p className={styles.detail}>
								<strong>Empresa:</strong> {cliente.empresa || 'No disponible'}
							</p>
							<p className={styles.detail}>
								<strong>RIF:</strong> {cliente.rif || 'No disponible'}
							</p>
							<button
								className={styles.deleteButton}
								onClick={() => deleteCustomer(cliente.id)}
							>
								<DeleteIcon />
							</button>
						</div>
					))
				) : (
					<p className={styles.message}>No se encontraron clientes.</p>
				)}
			</div>
		</div>
	);
}

export default ListaClientes;
