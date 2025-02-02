import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
	try {
		const body = await request.json();
		const { cliente, cedula, teléfono, email, direccion, empresa } = body; // ← Corregido

		if (!cliente || !cedula || !teléfono || !email || !direccion) {
			return new Response(
				JSON.stringify({ error: 'Todos los campos son obligatorios.' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const collectionRef = collection(db, 'clientes');
		const docRef = await addDoc(collectionRef, {
			cliente,
			cedula,
			teléfono,
			email,
			direccion,
			empresa: empresa || 'Sin empresa',
			fechaRegistro: new Date().toISOString(),
		});

		return new Response(
			JSON.stringify({ message: 'Cliente agregado con éxito.', id: docRef.id }),
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error al agregar cliente:', error);
		return new Response(
			JSON.stringify({ error: 'Error al agregar el cliente.' }),
			{ status: 500 }
		);
	}
}
