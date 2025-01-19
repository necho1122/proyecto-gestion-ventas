import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
	try {
		const body = await request.json();

		// Validar que se hayan enviado los datos requeridos
		const { cliente, teléfono, email, direccion, empresa } = body;
		if (!cliente || !teléfono || !email || !direccion || !empresa) {
			return new Response(
				JSON.stringify({ error: 'Todos los campos son obligatorios.' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Agregar el cliente a Firestore
		const collectionRef = collection(db, 'clientes');
		const docRef = await addDoc(collectionRef, {
			cliente,
			teléfono,
			email,
			direccion,
			empresa,
			fechaRegistro: new Date().toISOString(),
		});

		return new Response(
			JSON.stringify({
				message: 'Cliente agregado con éxito.',
				id: docRef.id, // ID generado automáticamente
			}),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error al agregar cliente:', error);
		return new Response(
			JSON.stringify({ error: 'Error al agregar el cliente.' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
