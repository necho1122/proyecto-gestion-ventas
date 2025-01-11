'use client';

import React from 'react';
import { useListaCompras } from '@/context/sellsContext';
import styles from './page.module.css';

function ListaCompras() {
	const { listaCompras, eliminarProducto, limpiarLista } = useListaCompras();

	// Función para procesar la compra
	const procesarCompra = async () => {
		if (listaCompras.length === 0) {
			alert('No hay productos en la lista para procesar.');
			return;
		}

		try {
			for (const producto of listaCompras) {
				console.log('Enviando producto:', producto); // Depuración
				const response = await fetch('/api/addSells', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(producto),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Error al procesar la compra');
				}
			}

			alert('Compra procesada con éxito.');
			limpiarLista();
		} catch (error) {
			console.error('Error al procesar la compra:', error);
			alert('Ocurrió un error al procesar la compra.');
		}
	};

	if (listaCompras.length === 0) {
		return <p>No hay productos en la lista de compras.</p>;
	}

	return (
		<div className={styles.container}>
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
