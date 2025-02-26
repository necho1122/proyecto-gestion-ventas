'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { HomeIcon } from '@/components/Icons';

async function agregarVenta(venta) {
	try {
		const response = await fetch('/api/addData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(venta),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error del servidor: ${errorText}`);
		}

		const data = await response.json();
		console.log('Venta agregada con éxito:', data);
	} catch (error) {
		console.error('Error al agregar venta:', error);
	}
}

function AddVentaComponent() {
	const [venta, setVenta] = useState({
		producto: '',
		cantidad: '',
		precioUnitario: '',
		codigo: '',
		proveedor: '',
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setVenta((prevVenta) => ({
			...prevVenta,
			[id]: value, // Actualiza el campo correspondiente
		}));
	};

	const handleAddVenta = async () => {
		if (!venta.producto || !venta.cantidad || !venta.precioUnitario) {
			alert('Por favor, completa todos los campos.');
			return;
		}
		await agregarVenta(venta); // Llama a la función para agregar la venta
		setVenta({ producto: '', cantidad: '', precioUnitario: '' }); // Limpia los campos
	};

	return (
		<div
			style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
		>
			<div className={styles.container}>
				<Link href='/home'>
					<HomeIcon />
				</Link>
				<h1>Agregar nuevo producto</h1>
				<div className={styles.formGroup}>
					<label htmlFor='producto'>Producto:</label>
					<input
						type='text'
						id='producto'
						value={venta.producto}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='cantidad'>Cantidad:</label>
					<input
						type='number'
						id='cantidad'
						value={venta.cantidad}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='precioUnitario'>Precio Unitario:</label>
					<input
						type='text'
						id='precioUnitario'
						value={venta.precioUnitario}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='codigo'>Código:</label>
					<input
						type='text'
						id='codigo'
						value={venta.codigo}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='proveedor'>Proveedor:</label>
					<input
						type='text'
						id='proveedor'
						value={venta.proveedor}
						onChange={handleChange}
					/>
				</div>
				<button onClick={handleAddVenta}>Agregar Producto</button>
				<Link href='/sell-stock/stock'>
					<button
						style={{
							backgroundColor: '#2196F3',
							color: 'white',
						}}
					>
						Volver
					</button>
				</Link>
			</div>
		</div>
	);
}

export default AddVentaComponent;
