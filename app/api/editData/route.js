import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function PATCH(request) {
	try {
		const body = await request.json();
		const { id, ...nuevosDatos } = body; // Asume que el ID y los datos a actualizar están en el cuerpo de la solicitud.

		// Validar que el ID está presente
		if (!id) {
			return new Response(
				JSON.stringify({ error: 'El ID del documento es obligatorio' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Referencia al documento específico
		const docRef = doc(db, 'ventas', id);

		// Actualizar los datos
		await updateDoc(docRef, nuevosDatos);

		return new Response(
			JSON.stringify({ message: 'Venta actualizada con éxito.' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error al procesar la solicitud:', error);
		return new Response(
			JSON.stringify({ error: 'Error al actualizar la venta' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
