import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './AdminTemplate.css';
import AdminSidebar from '../admin/AdminSidebar';
import AdminNav from '../admin/AdminNav';
import ListadoUsuarioComponent from '../components/ListadoUsuarioComponent/ListadoUsuarioComponent';
import EditUsuarioComponent from '../components/EditUsuarioComponent/EditUsuarioComponent';
import PermisoComponent from '../components/PermisoComponent/PermisoComponent';
import RolComponent from '../components/RolComponent/RolComponent';
import RolXPermisoComponent from '../components/RolXPermisoComponent/RolXPermisoComponent'
import RegistroUserComponent from '../components/RegistroUserComponent/RegistroUserComponent';
import ListadoProductosComponent from '../components/ListadoProductosComponent/ListadoProductosComponent';
import RegistroProductoComponent from '../components/RegistroProductoComponent/RegistroProductoComponent';
import EditarProductoComponent from '../components/EditarProductoComponent/EditarProductoComponent';
import ListadoComprasComponent from '../components/ListadoComprasComponent/ListadoComprasComponent';
import RegistroPermisoComponent from '../components/RegistroPermisoComponent/RegistroPermisoComponent';
import EditarPermisoComponent from '../components/EditarPermisoComponent/EditarPermisoComponent';
import RegistroRolComponent from '../components/RegistroRolComponent/RegistroRolComponent';
import EditarRolComponent from '../components/EditarRolComponent/EditarRolComponent';
import ListadoCuponesComponent from '../components/ListadoCuponesComponent/ListadoCuponesComponent';
import RegistroCuponComponent from '../components/RegistroCuponComponent/RegistroCuponComponent';
import EditarCuponComponent from '../components/EditarCuponComponent/EditarCuponComponent';
import OfertaComponent from '../components/OfertaComponent/OfertaComponent';
import RegistroOfertaComponent from '../components/RegistroOfertaComponent/RegistroOfertaComponent';
import EditarOfertaComponent from '../components/EditarOfertaComponent/EditarOfertaComponent';



const AdminTemplate = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminNav />
        <div className="admin-container">
          <Routes>
          <Route path="usuarios/listado" element={<ListadoUsuarioComponent/>} />
          <Route path="usuarios/editar/:id" element={<EditUsuarioComponent/>} />
          <Route path="permisos/editar/:id" element={<EditarPermisoComponent/>} />
          <Route path="subscriptions/edit/:id" element={<EditarProductoComponent/>} />
          <Route path="ofertas/editar/:id" element={<EditarOfertaComponent/>} />
          <Route path="cupones/editar/:id" element={<EditarCuponComponent/>} />
          <Route path="roles/editar/:id" element={<EditarRolComponent/>} />
          <Route path="permisos/listado" element={<PermisoComponent/>} />
          <Route path="roles/listado" element={<RolComponent/>} />
          <Route path="rolxpermiso/listado/:idrol" element={<RolXPermisoComponent/>} />
          <Route path="usuarios/agregar" element={<RegistroUserComponent/>} />
          <Route path="permisos/agregar" element={<RegistroPermisoComponent/>} />
          <Route path="oferta/agregar" element={<RegistroOfertaComponent/>} />
          <Route path="cupones/agregar" element={<RegistroCuponComponent/>} />
          <Route path="roles/agregar" element={<RegistroRolComponent/>} />
          <Route path="productos/listado" element={<ListadoProductosComponent/>} />
          <Route path="sub/agregar" element={<RegistroProductoComponent/>} />
          <Route path="movies/editar/:id" element={<EditarProductoComponent/>} />
          <Route path="compras/listado" element={<ListadoComprasComponent/>} />
          <Route path="cupones/listado" element={<ListadoCuponesComponent/>} />
          <Route path="ofertas/listado" element={<OfertaComponent/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
