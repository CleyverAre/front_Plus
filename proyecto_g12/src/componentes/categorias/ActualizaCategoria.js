import React, {useEffect, useState} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {useNavigate, useParams} from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const ActualizarCategoria = () => {

    const navigate = useNavigate();

    const {idCategoria} = useParams();
    //console.log(idCategoria);
    const [categoria, setCategoria] = useState({
        nombre: '',
        imagen: ''
    })

    const cargarCategoria = async () => {
        const response = await crud.GET(`/api/categorias/${idCategoria}`);
        console.log(response);
        setCategoria(response.categoria);
    }

    useEffect(() =>{
        cargarCategoria();
    },[]);

    //console.log(categoria);

    const {nombre, imagen} = categoria;

    const onChange = (e) =>{
        setCategoria({
            ...categoria,
                [e.target.name]: e.target.value
            })
    };

    const actualizarCategoria = async () =>{
        const data = {
            nombre: categoria.nombre,
            imagen: categoria.imagen
        }
        const response = await crud.PUT(`/api/categorias/${idCategoria}`, data);
        const mensaje = "la categoria se actualizo correctamente";
        swal({
            title:'Informacion',
            text: mensaje,
            icon:'success',
            buttons:{
                confirm:{
                    text: 'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal:true
                }
            }
        });
        navigate("/admin");
    
    }
    const onSubmit = (e) => {
        e.preventDefault();
        actualizarCategoria();
    }

    return (
        <>
        <Header/>
        <div className= "md:flex md:min-h-screen">
        <Sidebar/>
        <main className="flex-1"> 
        <div className= "mt-10 flex justify-center">
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
           Actualizar Categoria
        </h1> 
        </div>

        <div className= "mt-10 flex justify-center">
        <form 
        onSubmit={onSubmit}
        className="my-10 bg-white shadow roun-lg p-10"
     >
            <div className= "my-5">
            <label className = "uppercase text-gray-600 block-lx font-bold">  Nombre de la Categoria </label>
                <input
                type="nombre"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={nombre}
                onChange={onChange}
                />

                <label className = "uppercase text-gray-600 block-lx font-bold"> Imagen de la Categoria </label>
                <input
                type="text"
                id="imagen"
                name="imagen"
                placeholder="Imagen"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={imagen}
                onChange={onChange}
                />   


            </div>  
            <input
                type="submit"
                value="Actualizar Categoria"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-400 transition-colors"
            />
                     
       </form>
            </div>
            </main>

           </div>




        </>    
   
        );


}
export default ActualizarCategoria;