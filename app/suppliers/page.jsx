import React from 'react';
import styles from './page.module.css';

import { proveedores } from '@/utils/products';

function ListaProveedores() {
	return (
		<div className={styles.suppliersContainer}>
			<h1 className={styles.title}>Lista de Proveedores</h1>
			<div className={styles.cardsContainer}>
				{proveedores.map((proveedor) => (
					<div
						key={proveedor.id}
						className={styles.supplierCard}
					>
						<h2 className={styles.supplierName}>{proveedor.nombre}</h2>
						<p className={styles.detail}>
							<strong>Teléfono:</strong> {proveedor.telefono}
						</p>
						<p className={styles.detail}>
							<strong>Email:</strong>{' '}
							<a
								href={`mailto:${proveedor.email}`}
								className={styles.emailLink}
							>
								{proveedor.email}
							</a>
						</p>
						<p className={styles.detail}>
							<strong>Dirección:</strong> {proveedor.direccion}
						</p>
						<p className={styles.detail}>
							<strong>Productos:</strong> {proveedor.productos}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListaProveedores;
