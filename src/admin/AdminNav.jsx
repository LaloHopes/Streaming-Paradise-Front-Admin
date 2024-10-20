import React, { useContext } from 'react';
import './AdminNav.css'; 
import { useUser } from '../contexts/UserContext';
import ImgHome1 from "../assets/imagenes/ImgHome1.png";

const AdminNav = () => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Cargando...</div>; // Puedes ajustar esto según tu preferencia
    }

    return (
        <nav className="admin-nav">
            <div className="flex space-x-4">
                <a href="/" className="text-white flex items-center space-x-2 hvr-underline-from-center">
                    <i className="fas fa-home w-4 h-4"></i>
                    <span>Inicio</span>
                </a>
            </div>
            <div className="user-info">
                <img src={ImgHome1} alt="Perfil" className="w-8 h-8 rounded-full" />
                {user ? (
                    <span className="text-white">{user.name}</span>
                ) : (
                    <span className="text-white">Invitado</span>
                )}
            </div>
        </nav>
    );
};

export default AdminNav;
