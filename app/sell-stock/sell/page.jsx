import React from 'react';
import { products } from '@/utils/products';
import Link from 'next/link';
import styles from './page.module.css';

function SellStockPage() {
	// Lista de colores de fondo
	const colors = ['lightcoral', 'lightblue', 'lightgreen'];

	return (
		<div className={styles.toSellContainer}>
			<h1>Productos a la venta</h1>
			<div className={styles.productsToSellContainer}>
				{products.map((product, index) => (
					<div key={index}>
						<Link
							href={`/sell-stock/sell/${product.id}`}
							style={{
								backgroundColor: colors[index % colors.length],
								padding: '10px',
								borderRadius: '5px',
								textDecoration: 'none',
								display: 'block',
							}}
						>
							<div className={styles.productToSell}>
								<h4>{product.producto}</h4>
								<p>Precio unitario: ${product.precioUnitario}</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default SellStockPage;
