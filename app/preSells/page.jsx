'use client';

import { useState, useEffect } from 'react';
import { useListaCompras } from '@/context/sellsContext';
import styles from './page.module.css';
import Link from 'next/link';
import { HomeIcon } from '@/components/Icons';

function ListaCompras() {
	const { listaCompras, eliminarProducto, limpiarLista } = useListaCompras();
	const [stock, setStock] = useState([]);

	// Obtener la lista de inventario desde Firestore
	const obtenerStock = async () => {
		try {
			const response = await fetch('/api/getStocksData', { method: 'GET' });
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setStock(data); // Actualiza el estado con los datos obtenidos
		} catch (error) {
			console.error('Error al cargar ventas:', error.message);
		}
	};

	useEffect(() => {
		obtenerStock();
	}, []);

	const actualizarCantidades = async () => {
		try {
			// Creamos un arreglo de promesas de actualizaciones
			const promises = listaCompras.map(async (producto) => {
				// Buscar el producto en el stock
				const productoEnStock = stock.find((item) => item.id === producto.id);

				if (!productoEnStock) {
					throw new Error(
						`Producto no encontrado en el stock: ${producto.nombre}`
					);
				}

				// Verificar si la cantidad vendida supera el stock disponible
				const nuevaCantidad = productoEnStock.cantidad - producto.cantidad;

				console.log(typeof nuevaCantidad);

				// Verificar si la nueva cantidad es negativa o NaN
				if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
					alert(
						`La cantidad vendida de ${producto.nombre} supera el stock disponible o es inválida.`
					);
					throw new Error(
						`No hay suficiente stock para el producto: ${producto.nombre}`
					);
				}

				// Actualizar la cantidad en el stock
				const response = await fetch('/api/editItemQty', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: producto.id, // ID del producto
						nuevaCantidad, // La nueva cantidad calculada
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.error ||
							`Error al actualizar el stock del producto ${producto.nombre}`
					);
				}

				console.log(`Stock actualizado para: ${producto.nombre}`);
			});

			// Ejecutar todas las promesas
			await Promise.all(promises);

			alert('Stock actualizado exitosamente para todos los productos.');
			limpiarLista(); // Limpiar la lista después de procesar
		} catch (error) {
			console.error('Error al actualizar el stock:', error);
			alert('Ocurrió un error al actualizar el stock de los productos.');
		}
	};

	// Función para procesar la compra
	const procesarCompra = async () => {
		if (listaCompras.length === 0) {
			alert('No hay productos en la lista para procesar.');
			return;
		}

		try {
			// Crear un objeto que agrupe toda la lista de compras
			const compra = {
				fecha: new Date().toISOString(),
				productos: listaCompras,
			};

			// Enviar el objeto completo a la API
			const response = await fetch('/api/addSells', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(compra),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Error al procesar la compra');
			}

			alert('Compra procesada con éxito.');
			limpiarLista(); // Limpiar lista después de procesar la compra
		} catch (error) {
			console.error('Error al procesar la compra:', error);
			alert('Ocurrió un error al procesar la compra.');
		}

		// Llamar a la función para actualizar las cantidades
		await actualizarCantidades();
	};

	if (listaCompras.length === 0) {
		return (
			<div className={styles.WithoutItemsContainer}>
				<Link href='/home'>
					<HomeIcon />
				</Link>
				<p>No hay productos en la lista de compras.</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Link href='/home'>
				<HomeIcon />
			</Link>
			<h2 className={styles.heading}>Lista de Compras</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad</th>
						<th>Precio Unitario</th>
						<th>Precio Total</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{listaCompras.map((producto, index) => (
						<tr key={index}>
							<td>{producto.nombre}</td>
							<td>{producto.cantidad}</td>
							<td>${producto.precioUnitario}</td>
							<td>${producto.precioTotal}</td>
							<td>
								<button
									className={styles.deleteButton}
									onClick={() => eliminarProducto(index)}
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.actions}>
				<button
					className={`${styles.button} ${styles.clearButton}`}
					onClick={limpiarLista}
				>
					Limpiar Lista
				</button>
				<button
					className={`${styles.button} ${styles.processButton}`}
					onClick={procesarCompra}
				>
					Procesar Compra
				</button>
			</div>
		</div>
	);
}

export default ListaCompras;
