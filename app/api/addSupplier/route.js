import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
	try {
		const body = await request.json();

		if (
			!body.nombre ||
			!body.razonSocial ||
			!body.rif ||
			!body.telefono ||
			!body.email ||
			!body.direccion ||
			!body.productos ||
			!body.servicios ||
			!body.cargo ||
			!body.webrrss
		) {
			return new Response(
				JSON.stringify({ error: 'Todos los campos son obligatorios' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const docRef = await addDoc(collection(db, 'proveedores'), body);

		return new Response(
			JSON.stringify({
				message: 'Proveedor agregado con éxito',
				id: docRef.id,
			}),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error al agregar el proveedor:', error);
		return new Response(
			JSON.stringify({ error: 'Error al agregar el proveedor' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
