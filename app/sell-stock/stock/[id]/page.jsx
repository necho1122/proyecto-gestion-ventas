'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { HomeIcon } from '@/components/Icons';

async function obtenerProducto(id) {
	if (!id) return console.error('ID de producto no válido');

	try {
		const response = await fetch(`/api/getProduct?id=${id}`);
		if (!response.ok) {
			throw new Error('No se pudo obtener el producto');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error al obtener el producto:', error);
		throw error;
	}
}

async function editarProducto(id, producto) {
	try {
		const response = await fetch('/api/editData', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, ...producto }),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error del servidor: ${errorText}`);
		}

		const data = await response.json();
		console.log('Producto actualizado con éxito:', data);
		return data;
	} catch (error) {
		console.error('Error al actualizar producto:', error);
		throw error;
	}
}

function EditProduct({ params }) {
	const { id } = params;

	const [producto, setProducto] = useState({
		producto: '',
		cantidad: '',
		precioUnitario: '',
		codigo: '',
		proveedor: '',
	});

	const [ventas, setVentas] = useState([]);

	useEffect(() => {
		if (id) {
			obtenerProducto(id)
				.then((data) => {
					setProducto({
						producto: data.producto || '',
						cantidad: data.cantidad || '',
						precioUnitario: data.precioUnitario || '',
						codigo: data.codigo || '',
						proveedor: data.proveedor || '',
					});
				})
				.catch((error) => {
					console.error('Error al cargar el producto:', error);
				});
		}
	}, [id]);

	useEffect(() => {
		const obtenerVentas = async () => {
			try {
				const response = await fetch('/api/getStocksData');
				if (!response.ok) throw new Error('Error al obtener las ventas');
				const data = await response.json();
				setVentas(data);
			} catch (error) {
				console.error('Error al cargar ventas:', error.message);
			}
		};
		obtenerVentas();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProducto((prevProducto) => ({
			...prevProducto,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.values(producto).some((value) => !value)) {
			alert('Por favor, completa todos los campos.');
			return;
		}

		try {
			await editarProducto(id, producto);
			alert('Producto actualizado exitosamente');
		} catch (error) {
			alert('Error al actualizar el producto');
		}
	};

	const ventaEncontrada = ventas.find((venta) => venta.id === id) || {};

	return (
		<div className={styles.container}>
			<Link
				href='/home'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					marginBottom: '1rem',
				}}
			>
				<HomeIcon /> Ir a inicio
			</Link>
			<h1>Editar Producto</h1>
			<form onSubmit={handleSubmit}>
				{['producto', 'cantidad', 'precioUnitario', 'codigo', 'proveedor'].map(
					(field) => (
						<div
							className={styles.formGroup}
							key={field}
						>
							<label htmlFor={field}>
								{field.charAt(0).toUpperCase() + field.slice(1)}:
							</label>
							<input
								type={
									field === 'cantidad' || field === 'precioUnitario'
										? 'number'
										: 'text'
								}
								name={field}
								value={producto[field]}
								onChange={handleChange}
								required
								placeholder={ventaEncontrada[field] || `Sin ${field}`}
							/>
						</div>
					)
				)}
				<button type='submit'>Actualizar Producto</button>
			</form>
			<Link
				href='/sell-stock/stock'
				style={{
					marginTop: '1rem',
					marginBottom: '1rem',
					display: 'block',
					textAlign: 'center',
					color: '#1a73e8',
				}}
			>
				Volver a la lista de inventario
			</Link>
		</div>
	);
}

export default EditProduct;
