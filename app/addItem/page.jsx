'use client';

async function agregarVenta() {
	const venta = {
		producto: 'Kit de reglas',
		cantidad: '2',
		precioUnitario: '39,73',
	};

	try {
		const response = await fetch('/api/addData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(venta),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error del servidor: ${errorText}`);
		}

		const data = await response.json();
		console.log('Venta agregada con éxito:', data);
	} catch (error) {
		console.error('Error al agregar venta:', error);
	}
}

function AddVentaComponent() {
	const handleAddVenta = async () => {
		await agregarVenta(); // Llama a la función para agregar la venta
	};

	return (
		<div>
			<button
				onClick={handleAddVenta}
				style={{
					padding: '10px',
					backgroundColor: '#4CAF50',
					color: '#fff',
					border: 'none',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
			>
				Agregar Venta
			</button>
		</div>
	);
}

export default AddVentaComponent;
