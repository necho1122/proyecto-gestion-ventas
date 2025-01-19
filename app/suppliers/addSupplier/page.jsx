'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

function FormularioProveedor() {
	const [formData, setFormData] = useState({
		nombre: '',
		telefono: '',
		email: '',
		direccion: '',
		productos: '',
	});

	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/addSupplier', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Error al agregar el proveedor');
			}

			router.push('/suppliers');
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<div className={styles.formContainer}>
			<h1 className={styles.title}>Agregar Proveedor</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='nombre'
					placeholder='Nombre del proveedor'
					value={formData.nombre}
					onChange={handleChange}
					required
				/>
				<input
					type='tel'
					name='telefono'
					placeholder='Teléfono'
					value={formData.telefono}
					onChange={handleChange}
					required
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					name='direccion'
					placeholder='Dirección'
					value={formData.direccion}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					name='productos'
					placeholder='Productos'
					value={formData.productos}
					onChange={handleChange}
					required
				/>
				<button
					type='submit'
					className={styles.submitButton}
				>
					Agregar
				</button>
			</form>
		</div>
	);
}

export default FormularioProveedor;
