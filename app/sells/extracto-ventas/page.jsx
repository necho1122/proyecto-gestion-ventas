'use client';

import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import styles from './page.module.css';
import Link from 'next/link';
import { HomeIcon } from '@/components/Icons';

function VentasFiltradas() {
	const [ventas, setVentas] = useState([]); // Estado para todas las ventas
	const [ventasFiltradas, setVentasFiltradas] = useState([]); // Estado para las ventas filtradas
	const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');

	// Obtener todas las ventas desde Firebase
	const obtenerVentas = async () => {
		try {
			const response = await fetch('/api/getSellsData');
			if (!response.ok) throw new Error('Error al obtener las ventas');
			const data = await response.json();
			setVentas(data);
		} catch (error) {
			console.error('Error al obtener ventas:', error);
		}
	};

	useEffect(() => {
		obtenerVentas();
	}, []);

	// Filtrar ventas según el rango de fechas
	const filtrarVentas = () => {
		if (!fechaInicio || !fechaFin) return; // No hace nada si no hay fechas seleccionadas

		const inicio = new Date(fechaInicio);
		let fin = new Date(fechaFin);

		// Sumamos un día a la fecha de fin para incluir todo el día seleccionado
		fin.setDate(fin.getDate() + 1);
		fin.setHours(23, 59, 59, 999); // Esto ajusta el final del día al último momento posible

		// Filtrar ventas que estén dentro del rango
		const ventasFiltradas = ventas.filter((venta) => {
			const fechaVenta = new Date(venta.fecha);

			// Comparar solo las fechas sin tomar en cuenta la hora
			return fechaVenta >= inicio && fechaVenta <= fin;
		});

		setVentasFiltradas(ventasFiltradas);
	};

	// Calcular el total general de todas las ventas filtradas
	const calcularTotalGeneral = () => {
		return ventasFiltradas.reduce((acc, venta) => {
			return (
				acc +
				venta.productos.reduce((acc2, p) => {
					// Aseguramos que precioTotal sea un número antes de sumarlo
					const precioTotal = Number(p.precioTotal);
					return acc2 + (isNaN(precioTotal) ? 0 : precioTotal);
				}, 0)
			);
		}, 0);
	};

	// Función para generar el PDF
	const generarPDF = () => {
		const doc = new jsPDF();

		doc.setFontSize(16);
		doc.text('Extracto de Ventas', 20, 20);

		let yPosition = 30;

		// Encabezado de la tabla
		doc.setFontSize(12);
		doc.text('ID Factura', 20, yPosition);
		doc.text('Fecha', 60, yPosition);
		doc.text('Total', 120, yPosition);
		yPosition += 10;

		// Agregar las ventas filtradas a la tabla
		ventasFiltradas.forEach((venta) => {
			doc.text(venta.id_factura.toString(), 20, yPosition);
			doc.text(new Date(venta.fecha).toLocaleDateString(), 60, yPosition);
			doc.text(
				venta.productos
					.reduce((acc, p) => acc + (Number(p.precioTotal) || 0), 0)
					.toFixed(2),
				120,
				yPosition
			);
			yPosition += 10;
		});

		// Total General
		doc.setFontSize(14);
		doc.text(
			`Total General: $${calcularTotalGeneral().toFixed(2)}`,
			20,
			yPosition + 10
		);

		// Descargar el PDF
		doc.save('extracto_ventas.pdf');
	};

	return (
		<div className={styles.container}>
			<Link href='/home'>
				<HomeIcon />
			</Link>
			<h2 className={styles.heading}>Filtrar Ventas por Fecha</h2>
			<div className={styles.filters}>
				<label>Fecha Inicio:</label>
				<input
					type='date'
					value={fechaInicio}
					onChange={(e) => setFechaInicio(e.target.value)}
				/>
				<label>Fecha Fin:</label>
				<input
					type='date'
					value={fechaFin}
					onChange={(e) => setFechaFin(e.target.value)}
				/>
				<button
					className={styles.actionButton}
					onClick={filtrarVentas}
				>
					Filtrar
				</button>
				<button
					className={styles.actionButton}
					onClick={generarPDF}
				>
					Descargar PDF
				</button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID Factura</th>
						<th>Fecha</th>
						<th>Productos</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{ventasFiltradas.length > 0 ? (
						ventasFiltradas.map((venta) => (
							<tr key={venta.id_factura}>
								<td>{venta.id_factura}</td>
								<td>{new Date(venta.fecha).toLocaleDateString()}</td>
								<td>
									<ul>
										{venta.productos.map((p, index) => (
											<li key={index}>
												{p.nombre} (x{p.cantidad}) - ${p.precioUnitario}
											</li>
										))}
									</ul>
								</td>
								<td>
									$
									{venta.productos
										.reduce((acc, p) => {
											// Aseguramos que precioTotal sea un número válido
											const precioTotal = Number(p.precioTotal);
											return acc + (isNaN(precioTotal) ? 0 : precioTotal);
										}, 0)
										.toFixed(2)}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='4'>No hay ventas en el periodo seleccionado</td>
						</tr>
					)}
				</tbody>
			</table>

			{ventasFiltradas.length > 0 && (
				<div className={styles.totalGeneral}>
					<h3>Total General: ${calcularTotalGeneral().toFixed(2)}</h3>
				</div>
			)}
		</div>
	);
}

export default VentasFiltradas;
