'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useListaCompras } from '@/context/sellsContext';

function ProductPage({ params }) {
	const [product, setProduct] = useState(null);

	// Obtener el producto específico basado en el ID
	const obtenerProducto = async () => {
		try {
			const response = await fetch('/api/getSellsData');
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const ventas = await response.json();
			const productoEncontrado = ventas.find(
				(venta) => String(venta.id) === String(params.id)
			);
			setProduct(productoEncontrado);
		} catch (error) {
			console.error(error.message);
		}
	};

	// Llamar a la función obtenerProducto cada vez que el ID cambie
	useEffect(() => {
		obtenerProducto();
	}, [params.id]);

	// Calcular la suma total de la compra
	const totalCompra = product
		? product.productos.reduce((total, prod) => {
				return total + prod.cantidad * parseFloat(prod.precioUnitario);
		  }, 0)
		: 0;

	if (!product) {
		return <div>Compra no encontrada</div>;
	}

	return (
		<div className={styles.itemContainer}>
			<h1 className={styles.title}>Factura de Compra</h1>
			<h3 className={styles.productName}>ID de Compra: {product.id}</h3>
			<p className={styles.date}>
				Fecha: {new Date(product.fecha).toLocaleString()}
			</p>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad</th>
						<th>Precio Unitario</th>
						<th>Precio Total</th>
					</tr>
				</thead>
				<tbody>
					{product.productos.map((prod, index) => (
						<tr key={index}>
							<td>{prod.nombre}</td>
							<td>{prod.cantidad}</td>
							<td>${parseFloat(prod.precioUnitario).toFixed(2)}</td>
							<td>
								${(prod.cantidad * parseFloat(prod.precioUnitario)).toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className={styles.totalContainer}>
				<h4 className={styles.totalText}>Total:</h4>
				<span className={styles.totalAmount}>${totalCompra.toFixed(2)}</span>
			</div>

			<div className={styles.linkContainer}>
				<Link
					href='/sells'
					className={styles.link}
				>
					Volver a Ventas
				</Link>
			</div>
		</div>
	);
}

export default ProductPage;
