import React from 'react';
import { products } from '@/utils/products';
import styles from './page.module.css';

function ProductPage({ params }) {
	// Encuentra el producto basado en el ID proporcionado
	const product = products.find((p) => p.id === params.id);

	// Si no se encuentra el producto, muestra un mensaje de error
	if (!product) {
		return <div>Producto no encontrado</div>;
	}

	return (
		<div className={styles.itemContainer}>
			<h1>Detalles del Producto</h1>
			<h3>Producto: {product.producto}</h3>
			<div className={styles.itemQuantity}>
				<p>Precio unitario: ${product.precioUnitario}</p>
				<button>+</button>
			</div>
			<button>Agregar</button>
		</div>
	);
}

export default ProductPage;
