import { products } from '@/utils/products';
import styles from './page.module.css';

function page() {
	return (
		<div className={styles.productsContainer}>
			<h1>Lista de Inventario</h1>
			<table>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Cantidad</th>
						<th>Precio Unitario</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={index}>
							<td>{product.producto}</td>
							<td>{product.cantidad}</td>
							<td>{product.precioUnitario}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default page;
