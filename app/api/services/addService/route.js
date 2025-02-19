import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
	try {
		const body = await request.json();
		const { servicio, descripcion, precio } = body;

		// Validación de campos obligatorios
		if (!servicio || !descripcion || !precio) {
			return new Response(
				JSON.stringify({ error: 'Todos los campos son obligatorios.' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Referencia a la colección en Firestore
		const docRef = await addDoc(collection(db, 'services'), {
			servicio,
			descripcion,
			precio: parseFloat(precio),
		});

		return new Response(
			JSON.stringify({
				message: 'Servicio agregado con éxito.',
				id: docRef.id,
			}),
			{ status: 201, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Error al agregar servicio:', error);
		return new Response(
			JSON.stringify({ error: 'Error al agregar el servicio.' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}
