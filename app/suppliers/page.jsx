'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { DeleteIcon } from '@/components/Icons';

function ListaProveedores() {
	const [proveedores, setProveedores] = useState([]);

	// Función para obtener los proveedores desde Firebase
	const getProveedores = async () => {
		try {
			const response = await fetch('/api/getSuppliers', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener los proveedores');
			const data = await response.json();
			setProveedores(data);
		} catch (error) {
			console.error(error.message);
			alert('Error al obtener los proveedores.');
		}
	};

	// Función para eliminar un proveedor
	const deleteProveedor = async (id) => {
		try {
			const response = await fetch('/api/deleteSupplier', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (!response.ok) {
				throw new Error('Error al eliminar el proveedor');
			}

			setProveedores((prev) => prev.filter((proveedor) => proveedor.id !== id));
			alert('Proveedor eliminado con éxito.');
		} catch (error) {
			console.error(error.message);
			alert('Error al eliminar el proveedor.');
		}
	};

	useEffect(() => {
		getProveedores();
	}, []);

	return (
		<div className={styles.suppliersContainer}>
			<h1 className={styles.title}>Lista de Proveedores</h1>
			<div className={styles.cardsContainer}>
				{proveedores.map((proveedor) => (
					<div
						key={proveedor.id}
						className={styles.supplierCard}
					>
						<h2 className={styles.supplierName}>{proveedor.nombre}</h2>
						<p className={styles.detail}>
							<strong>Teléfono:</strong> {proveedor.telefono}
						</p>
						<p className={styles.detail}>
							<strong>Email:</strong>{' '}
							<a
								href={`mailto:${proveedor.email}`}
								className={styles.emailLink}
							>
								{proveedor.email}
							</a>
						</p>
						<p className={styles.detail}>
							<strong>Dirección:</strong> {proveedor.direccion}
						</p>
						<p className={styles.detail}>
							<strong>Productos:</strong> {proveedor.productos}
						</p>
						<button
							className={styles.deleteButton}
							onClick={() => deleteProveedor(proveedor.id)}
						>
							<DeleteIcon />
						</button>
					</div>
				))}
			</div>
			<Link
				href='/suppliers/addSupplier'
				style={{
					marginTop: '1rem',
					display: 'block',
					textAlign: 'center',
					color: '#1a73e8',
				}}
			>
				Agregar Proveedor
			</Link>
		</div>
	);
}

export default ListaProveedores;
