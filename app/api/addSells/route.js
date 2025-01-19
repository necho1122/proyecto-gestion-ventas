import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
	try {
		const body = await request.json();

		// Agregar el nuevo documento a Firestore
		const collectionRef = collection(db, 'sells');
		const docRef = await addDoc(collectionRef, {
			nombre: body.nombre,
			cantidad: body.cantidad,
			precioUnitario: body.precioUnitario,
			precioTotal: body.precioTotal,
			fecha: new Date().toISOString(),
		});

		console.log('Venta agregada con ID:', docRef.id);

		return new Response(
			JSON.stringify({
				message: 'Venta agregada con éxito.',
				id: docRef.id, // Retornar el ID generado automáticamente si es necesario
			}),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error al procesar la solicitud:', error);
		return new Response(
			JSON.stringify({ error: 'Error al agregar la venta' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
