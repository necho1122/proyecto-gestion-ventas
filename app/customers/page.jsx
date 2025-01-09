import React from 'react';
import { clientes } from '@/utils/products';
import styles from './page.module.css';

function ListaClientes() {
	return (
		<div className={styles.customersContainer}>
			<h1>Lista de Clientes</h1>
			<div>
				{clientes.map((cliente) => (
					<div
						key={cliente.id}
						className={styles.customerCard}
					>
						<h2>{cliente.nombre}</h2>
						<p>
							<strong>Teléfono:</strong> {cliente.telefono}
						</p>
						<p>
							<strong>Email:</strong>{' '}
							<a href={`mailto:${cliente.email}`}>{cliente.email}</a>
						</p>
						<p>
							<strong>Dirección:</strong> {cliente.direccion}
						</p>
						<p>
							<strong>Empresa:</strong> {cliente.empresa}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListaClientes;
