import React from 'react';
import styles from './page.module.css';

import { proveedores } from '@/utils/products';

function ListaProveedores() {
	return (
		<div className={styles.suppliersContainer}>
			<h1>Lista de Proveedores</h1>
			<div>
				{proveedores.map((proveedor) => (
					<div
						key={proveedor.id}
						className={styles.supplierCard}
					>
						<h2>{proveedor.nombre}</h2>
						<p>
							<strong>Teléfono:</strong> {proveedor.telefono}
						</p>
						<p>
							<strong>Email:</strong>{' '}
							<a href={`mailto:${proveedor.email}`}>{proveedor.email}</a>
						</p>
						<p>
							<strong>Dirección:</strong> {proveedor.direccion}
						</p>
						<p>
							<strong>Productos:</strong> {proveedor.productos}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListaProveedores;
