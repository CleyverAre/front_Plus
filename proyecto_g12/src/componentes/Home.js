import React, { useEffect, useState } from "react";
import {Link } from "react-router-dom";
import crud from '../conexiones/crud';

const Home = () => {
  
  const [categoria, setCategoria] = useState([]);

  const cargarCategorias = async () =>{
    const response = await crud.GET(`/api/categorias/home`);
    setCategoria(response.categorias);
  }
  useEffect(()=>{
    cargarCategorias();
  },[]);
  
  const categorias = {}

  categorias.forEach(item => {
    categorias[item._id] = item.nombre;
  });

  //Obtener todos los productos
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () =>{
    const response = await crud.GET(`/api/productos`);
    setProductos(response.productos);
  }
  useEffect(()=>{
    cargarProductos();
  },[]);
 
  


    return (
    
     
     
      <main>
        <h1 className="home__title">Ver todas las categorías</h1>
        <div className="home__cardsCategoriesContainer">
          {
            categorias.map(
              item =>
              
                <div className="home__cardCategory" key={item._id}>
                  <div className="home__imgContainer">
                    <img src={item.imagen} alt="No se ha podido cargar la imagen" />
                  </div>

                  <h3>{item.nombre}</h3>
                </div>
            )
          }
        </div>
        
        <div className="bg-gray-300">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Customers also bought</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {productos.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imagen}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.nombre}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.stock}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.precio}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </main>
    );
}

export default Home;