'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

function AddCustomerForm() {
	const [formData, setFormData] = useState({
		cliente: '',
		teléfono: '',
		email: '',
		direccion: '',
		empresa: '',
	});

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		// Validar datos antes de enviar
		if (
			!formData.cliente ||
			!formData.teléfono ||
			!formData.email ||
			!formData.direccion ||
			!formData.empresa
		) {
			setMessage('Por favor, completa todos los campos.');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/addCustomer', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Error al agregar el cliente.');
			}

			const data = await response.json();
			setMessage(`Cliente agregado con éxito: ID ${data.id}`);
			setFormData({
				cliente: '',
				teléfono: '',
				email: '',
				direccion: '',
				empresa: '',
			});
		} catch (error) {
			setMessage('Error al agregar el cliente. Intenta nuevamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.formContainer}>
			<h2 className={styles.title}>Agregar Nuevo Cliente</h2>
			{message && <p className={styles.message}>{message}</p>}
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				<div className={styles.formGroup}>
					<label htmlFor='cliente'>Nombre del Cliente:</label>
					<input
						type='text'
						id='cliente'
						value={formData.cliente}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='teléfono'>Teléfono:</label>
					<input
						type='text'
						id='teléfono'
						value={formData.teléfono}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='direccion'>Dirección:</label>
					<input
						type='text'
						id='direccion'
						value={formData.direccion}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='empresa'>Empresa:</label>
					<input
						type='text'
						id='empresa'
						value={formData.empresa}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					type='submit'
					className={styles.submitButton}
					disabled={loading}
				>
					{loading ? 'Agregando...' : 'Agregar Cliente'}
				</button>
			</form>
			<Link
				href='/customers'
				style={{
					marginTop: '1rem',
					display: 'block',
					textAlign: 'center',
					color: '#1a73e8',
				}}
			>
				Regresar a la lista de clientes
			</Link>
		</div>
	);
}

export default AddCustomerForm;
