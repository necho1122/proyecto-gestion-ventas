'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useListaCompras } from '@/context/sellsContext';

function ProductPage({ params }) {
	const [cantidad, setCantidad] = useState(1); // Iniciar la cantidad como 1
	const { agregarProducto } = useListaCompras();
	const [product, setProduct] = useState(null);
	const [ventas, setVentas] = useState([]); // Define el estado en el componente

	// Función para obtener las ventas desde la API
	const obtenerVentas = async () => {
		try {
			const response = await fetch('/api/getStocksData', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setVentas(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		obtenerVentas();
	}, []);

	// Usar useEffect para manejar el acceso a params y ventas
	useEffect(() => {
		if (ventas.length > 0) {
			// Asegúrate de comparar `id` con el tipo correcto
			const id = params.id;
			const productoEncontrado = ventas.find(
				(p) => String(p.id) === String(id)
			);
			setProduct(productoEncontrado);
		}
	}, [params, ventas]);

	// Si no se encuentra el producto, muestra un mensaje de error
	if (!product) {
		return <div>Producto no encontrado</div>;
	}

	// Función para manejar el incremento de la cantidad
	const incrementarCantidad = () => {
		setCantidad((prevCantidad) => prevCantidad + 1);
	};

	// Función para manejar el decremento de la cantidad
	const decrementarCantidad = () => {
		if (cantidad > 1) {
			setCantidad((prevCantidad) => prevCantidad - 1);
		}
	};

	// Función para agregar el producto a la lista de compras
	const handleAgregarProducto = () => {
		const precioUnitarioNumber = parseFloat(product.precioUnitario);

		// Validar si el precio unitario se pudo convertir
		if (isNaN(precioUnitarioNumber)) {
			alert('Error: Precio unitario no es válido');
			return;
		}

		// Crear el producto para agregar
		const productoParaAgregar = {
			nombre: product.producto,
			cantidad: cantidad,
			precioUnitario: precioUnitarioNumber.toFixed(2), // Formato con dos decimales
			precioTotal: (cantidad * precioUnitarioNumber).toFixed(2), // Formato con dos decimales
			fecha: new Date().toISOString(),
		};

		// Agregar el producto a la lista
		agregarProducto(productoParaAgregar);
		alert('Producto agregado a la lista de compras'); // Feedback al usuario
	};

	return (
		<div className={styles.itemContainer}>
			<h1>Detalles del Producto</h1>
			<h3>Producto: {product.producto}</h3>
			<div className={styles.itemQuantity}>
				<p>Precio unitario: ${parseFloat(product.precioUnitario).toFixed(2)}</p>
				<div>
					<button onClick={decrementarCantidad}>-</button>
					<span>{cantidad}</span>
					<button onClick={incrementarCantidad}>+</button>
				</div>
			</div>
			<button onClick={handleAgregarProducto}>
				Agregar a la lista de compras
			</button>
			<Link href='/sell-stock/sell'>Volver</Link>
			<Link href='/preSells'>Ir a lista</Link>
		</div>
	);
}

export default ProductPage;
