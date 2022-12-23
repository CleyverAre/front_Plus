import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    
    return (
        <aside className="md:w-50 lg:w-60 px-5 py-10 bg-slate-700">

<Link to={"/"} className="adminSidebar__item">
            Inicio
        </Link>
        <Link to={"/crear-categoria"} className="adminSidebar__item">
            Crear categoría
        </Link>
        <Link to={"/crear-producto"} className="adminSidebar__item">
            Crear producto
        </Link>
        <Link to={"/admin"} className="adminSidebar__item">
            Ver listado de categorías
        </Link>

    </aside>
  );

}

export default Sidebar;