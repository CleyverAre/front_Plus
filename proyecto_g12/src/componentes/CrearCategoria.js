import React,{useEffect, useState } from "react";
import Header from "../componentes/Header";
import Sidebar from "../componentes/Sidebar";
import { useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const CrearCategoria = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () =>{
        const token = localStorage.getItem('token');

        //Si no hay token o si el token no es válido se redirigirá a /login
        if(!token){
            navigate("/login");
        }
        else{
          const response = await crud.GET(`/api/auth`);
          if(!response.usuario) navigate("/login");
        }

    }
    autenticarUsuario();
}, [navigate]);//[] Se ejecuta solo una vez

const [categoria, setCategoria] = useState({
nombre: '',
imagen: ''
});

const {nombre} = categoria;

const onChange = (e) =>{
setCategoria({
  ...categoria,
  [e.target.name]: e.target.value
})
};

const crearCategoria = async () =>{

  if(categoria.nombre === "" || categoria.imagen === ""){
    swal({
      title: 'Completa todos los campos',
        icon: 'https://cdn-icons-png.flaticon.com/512/5664/5664353.png',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            closeModal: true,
            className: 'blue-btn'
          }
        }
    });
  }

  const data = {
    nombre: categoria.nombre,
    imagen: categoria.imagen
  }
  //console.log(data);

  try{
    const response = await crud.POST('/api/categorias', data);
    console.log(response);

    swal({
      title: 'La categoría fue creada exitosamente',
        icon: 'success',
        buttons: {
            confirm: {
                text: 'OK',
                value: true,
                visible: true,
                closeModal: true,
                className: 'blue-btn'
            }
        }
    });
    navigate('/admin');
  }catch(error){
    swal({
      title: 'Lo sentimos, ha ocurrido un error',
        icon: 'error',
        buttons: {
            confirm: {
                text: 'OK',
                value: true,
                visible: true,
                closeModal: true,
                className: 'blue-btn'
            }
        }
    });
  }

  
}

const onSubmit = e => {
  e.preventDefault();
  crearCategoria();
}




  return (
    <>
  
      <Header/>
      <div className="md:flex md:min-h-screen">
        <Sidebar/>
        <main className="flex-1">
        <div className="mt-10 flex justify-center">
        
         <h1> crear categoria</h1>

   
      <form className="form-createCategory" onSubmit={onSubmit}>
        <label className="uppercase text-gray-600 block text-lx font-bold">Nombre de la categoria</label>
        <input 
        type="nombre"
        id="nombre"
        name="nombre"
        placeholder="Nombre"
        value={nombre}
        onChange={onChange}
        />

        <label className="uppercase text-gray-600 block text-lx font-bold">Imagen de la categoria</label>
        <input 
        type="text"
        id="imagen"
        name="imagen"
        placeholder="Imagen"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value="https://res.cloudinary.com/db5wckoao/image/upload/v1671680098/salacomputo_ngtynh.webp"
        onChange={onChange}
        />

       
      
      <input 
          type="submit"
          value="Crear Categoria"
          className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
      />

  </form>
        </div>

        </main>
        
     
      </div>
    
    
    </>
    );
}

export default CrearCategoria;