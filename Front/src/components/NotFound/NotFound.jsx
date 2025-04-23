import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '/assets/not_found.jpg'; // Ajusta la ruta según tu estructura

export default function NotFound() {
    return (
        <div className="vh-100">
            {/* Div superior para el texto y el botón */}
            <div className="d-flex justify-content-between align-items-center bg-dark text-white p-4" style={{ height: '10%' }}>
                <h2>¡Vaya! Página no encontrada</h2>
                <Link to="/">
                    <button className="btn btn-primary">Volver al inicio</button>
                </Link>
            </div>

            {/* Imagen ocupando el 90% del alto de la pantalla */}
            <div style={{ height: '90%' }}>
                <img
                    src={notFoundImage}
                    alt="not_found"
                    className="w-100 h-100 object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
            </div>
        </div>
    );
}
