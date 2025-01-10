import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function POST(request) {
	try {
		const body = await request.json();

		// Obtener el número total de documentos existentes para asignar el ID
		const collectionRef = collection(db, 'sells');
		const snapshot = await getDocs(collectionRef);
		const totalDocs = snapshot.size;
		const newId = totalDocs + 1;

		// Agregar el nuevo documento a Firestore
		const docRef = await addDoc(collectionRef, {
			id: newId,
			producto: body.producto,
			cantidad: body.cantidad,
			precioUnitario: body.precioUnitario,
			precioTotal: body.precioTotal,
			fecha: body.fecha,
		});

		console.log('Venta agregada con ID:', docRef.id);

		return new Response(
			JSON.stringify({ message: 'Venta agregada con éxito.' }),
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
