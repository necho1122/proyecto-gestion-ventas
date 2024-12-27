import React from 'react';
import Link from 'next/link';
import styles from './UserPanel.module.css';

function UserPanel() {
	return (
		<div className={styles.userPanel}>
			<Link href='/ventas'>Ventas</Link>
			<Link href='/productos'>Productos</Link>
			<Link href='/clientes'>Clientes</Link>
			<Link href='/proveedores'>Proveedores</Link>
			<Link href='/proveedores'>Inventario</Link>
		</div>
	);
}

export default UserPanel;
