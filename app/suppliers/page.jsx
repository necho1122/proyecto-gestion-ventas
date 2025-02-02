'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { DeleteIcon, HomeIcon } from '@/components/Icons';

function ListaProveedores() {
	const [suppliers, setSuppliers] = useState([]); // Estado para los proveedores filtrados
	const [allSuppliers, setAllSuppliers] = useState([]); // Estado para todos los proveedores
	const [message, setMessage] = useState(null);

	// Función para obtener proveedores desde Firebase
	const getSuppliers = async () => {
		try {
			const response = await fetch('/api/getSuppliers', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los proveedores');
			const data = await response.json();
			setSuppliers(data); // Actualiza el estado con los datos filtrados
			setAllSuppliers(data); // Almacena todos los proveedores en un estado separado
		} catch (error) {
			console.error(error.message);
			alert('Error al obtener los proveedores.');
		}
	};

	// Función para eliminar un proveedor
	const deleteSupplier = async (id) => {
		// Mostrar alerta de confirmación
		const confirmDelete = window.confirm(
			'¿Estás seguro de que deseas eliminar este proveedor?'
		);

		if (!confirmDelete) return; // Si el usuario cancela, no se ejecuta la eliminación

		try {
			const response = await fetch('/api/deleteSupplier', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (!response.ok) {
				throw new Error('Error al eliminar el proveedor');
			}

			// Actualizar la lista de proveedores
			setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
			setMessage('Proveedor eliminado con éxito.');
		} catch (error) {
			console.error(error.message);
			setMessage('Error al eliminar el proveedor.');
		}
	};

	// Filtrar proveedores según la búsqueda
	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();
		if (searchValue === '') {
			setSuppliers(allSuppliers); // Si no hay texto de búsqueda, muestra todos los proveedores
		} else {
			const filteredSuppliers = allSuppliers.filter((supplier) =>
				supplier.nombre
					.toLowerCase()
					.slice(0, searchValue.length)
					.includes(searchValue)
			);
			setSuppliers(filteredSuppliers); // Muestra los proveedores filtrados
		}
	};

	useEffect(() => {
		getSuppliers();
	}, []);

	return (
		<div className={styles.suppliersContainer}>
			<Link href='/home'>
				<HomeIcon />
			</Link>
			<h1 className={styles.title}>Lista de Proveedores</h1>
			<div className={styles.searchContainer}>
				<input
					type='text'
					placeholder='Buscar proveedor'
					className={styles.searchInput}
					onChange={handleSearch} // Ejecuta la búsqueda al escribir
				/>
			</div>

			<Link
				href='/suppliers/addSupplier'
				style={{
					marginTop: '1rem',
					marginBottom: '1rem',
					display: 'block',
					textAlign: 'center',
					color: '#1a73e8',
				}}
			>
				Agregar Proveedor
			</Link>

			{message && <p className={styles.message}>{message}</p>}
			<div className={styles.cardsContainer}>
				{suppliers.map((supplier) => (
					<div
						key={supplier.id}
						className={styles.supplierCard}
					>
						<h2 className={styles.supplierName}>{supplier.nombre}</h2>
						<p className={styles.detail}>
							<strong>Razón Social:</strong> {supplier.razonSocial}
						</p>
						<p className={styles.detail}>
							<strong>RIF:</strong> {supplier.rif}
						</p>
						<p className={styles.detail}>
							<strong>Teléfono:</strong> {supplier.telefono}
						</p>
						<p className={styles.detail}>
							<strong>Email:</strong>{' '}
							<a
								href={`mailto:${supplier.email}`}
								className={styles.emailLink}
							>
								{supplier.email}
							</a>
						</p>
						<p className={styles.detail}>
							<strong>Dirección:</strong> {supplier.direccion}
						</p>
						<p className={styles.detail}>
							<strong>Productos:</strong> {supplier.productos}
						</p>
						<p className={styles.detail}>
							<strong>Servicios:</strong> {supplier.servicios}
						</p>
						<p className={styles.detail}>
							<strong>Cargo en la empresa:</strong> {supplier.cargo}
						</p>
						<p className={styles.detail}>
							<strong>Web/RRSS:</strong> {supplier.webrrss}
						</p>
						<button
							className={styles.deleteButton}
							onClick={() => deleteSupplier(supplier.id)}
						>
							<DeleteIcon />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListaProveedores;
