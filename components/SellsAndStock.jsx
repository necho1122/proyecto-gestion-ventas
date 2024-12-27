import React from 'react';
import styles from './SellsAndStock.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/utils/products';

function sellsAndStock() {
	const ventas = products.slice(0, 6);

	return (
		<div className={styles.sellsAndStock}>
			<div className={styles.sellsAndStock__links}>
				<Link href='/sell-stock/sell'>
					<h2>Vender</h2>
				</Link>
				<Link href='/sell-stock/stock'>
					<h2>Inventario</h2>
				</Link>
			</div>
			<div>
				<h3>Ventas recientes</h3>
				<ul>
					{ventas.map((venta, index) => (
						<li key={index}>
							<Image
								src='https://cdn-icons-png.flaticon.com/512/8221/8221097.png'
								alt='Venta'
								width={20}
								height={20}
							/>{' '}
							<span>{venta.producto}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default sellsAndStock;
