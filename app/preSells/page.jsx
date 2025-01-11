'use client';

import React from 'react';
import { useListaCompras } from '@/context/sellsContext';

const ListaCompras = () => {
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
		<div>
			<h2>Lista de Compras</h2>
			<ul>
				{listaCompras.map((producto, index) => (
					<li key={index}>
						{producto.nombre} - Cantidad: {producto.cantidad} - Precio Unitario:
						${producto.precioUnitario} - Precio Total: ${producto.precioTotal}
						<button onClick={() => eliminarProducto(index)}>Eliminar</button>
					</li>
				))}
			</ul>
			<div style={{ marginTop: '10px' }}>
				<button
					onClick={limpiarLista}
					style={{ marginRight: '10px' }}
				>
					Limpiar Lista
				</button>
				<button onClick={procesarCompra}>Procesar Compra</button>
			</div>
		</div>
	);
};

export default ListaCompras;
