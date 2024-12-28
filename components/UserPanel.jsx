import React from 'react';
import Link from 'next/link';
import styles from './UserPanel.module.css';
import { Sell, Productos, Clients, Suppliers, Inventory } from './Icons';

function UserPanel() {
	return (
		<div className={styles.userPanel}>
			<Link href='/sells'>
				<Sell />
				Ventas
			</Link>
			<Link href='/products'>
				<Productos />
				Productos
			</Link>
			<Link href='/clientes'>
				<Clients /> Clientes
			</Link>
			<Link href='/proveedores'>
				<Suppliers /> Proveedores
			</Link>
			<Link href='/proveedores'>
				<Inventory />
				Inventario
			</Link>
		</div>
	);
}

export default UserPanel;
