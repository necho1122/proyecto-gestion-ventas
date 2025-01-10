'use client';

import { useState } from 'react';

async function agregarVenta(venta) {
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
  const [venta, setVenta] = useState({
    producto: '',
    cantidad: '',
    precioUnitario: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVenta((prevVenta) => ({
      ...prevVenta,
      [id]: value, // Actualiza el campo correspondiente
    }));
  };

  const handleAddVenta = async () => {
    if (!venta.producto || !venta.cantidad || !venta.precioUnitario) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    await agregarVenta(venta); // Llama a la función para agregar la venta
    setVenta({ producto: '', cantidad: '', precioUnitario: '' }); // Limpia los campos
  };

  return (
    <div>
      <h1>Agregar nuevo producto</h1>
      <div>
        <label htmlFor="producto">Producto:</label>
        <input
          type="text"
          id="producto"
          value={venta.producto}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          value={venta.cantidad}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="precioUnitario">Precio Unitario:</label>
        <input
          type="text"
          id="precioUnitario"
          value={venta.precioUnitario}
          onChange={handleChange}
        />
      </div>
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
