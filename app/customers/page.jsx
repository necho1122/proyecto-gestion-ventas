import React from 'react';
import { clientes } from '@/utils/products';
import styles from './page.module.css';

function ListaClientes() {
	return (
		<div className={styles.customersContainer}>
			<h1 className={styles.title}>Lista de Clientes</h1>
			<div className={styles.cardsContainer}>
				{clientes.map((cliente) => (
					<div
						key={cliente.id}
						className={styles.customerCard}
					>
						<h2 className={styles.customerName}>{cliente.nombre}</h2>
						<p className={styles.detail}>
							<strong>Teléfono:</strong> {cliente.telefono}
						</p>
						<p className={styles.detail}>
							<strong>Email:</strong>{' '}
							<a
								href={`mailto:${cliente.email}`}
								className={styles.emailLink}
							>
								{cliente.email}
							</a>
						</p>
						<p className={styles.detail}>
							<strong>Dirección:</strong> {cliente.direccion}
						</p>
						<p className={styles.detail}>
							<strong>Empresa:</strong> {cliente.empresa}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListaClientes;
