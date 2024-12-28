// pages/api/addData.js
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { producto, cantidad, precioUnitario } = req.body;

		if (!producto || !cantidad || !precioUnitario) {
			return res.status(400).json({ error: 'Todos los campos son requeridos' });
		}

		try {
			// Referencia a la colección
			const ventasCollection = collection(db, 'ventas');

			// Obtener todos los documentos en la colección
			const snapshot = await getDocs(ventasCollection);

			// Determinar el próximo ID
			const nextId = snapshot.size + 1;

			// Agregar nuevo documento con el ID calculado
			const docRef = await addDoc(ventasCollection, {
				id: nextId.toString(),
				producto,
				cantidad,
				precioUnitario,
			});

			return res
				.status(200)
				.json({ message: 'Datos agregados', id: docRef.id });
		} catch (error) {
			console.error('Error al agregar los datos:', error);
			return res.status(500).json({ error: 'Error al agregar los datos' });
		}
	} else {
		return res.status(405).json({ error: 'Método no permitido' });
	}
}
