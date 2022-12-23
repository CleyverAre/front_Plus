import React, {useState} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {useNavigate } from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const CrearProductos = () => {

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

    const [ setCategoria] = useState([]);

    useEffect(() => {
    } )  
            
           
            setCategoria(responseCategoria.categoria);

            if(responseCategoria.categoria.length === 0){

                swal({
                  title: 'No se puede crear productos aún',
                  text: 'Primero debes crear alguna categoría',
                    icon: "https://res.cloudinary.com/db5wckoao/image/upload/v1671690923/tecno_hsrbeq.webp",
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

                navigate("/crear-categoria");
            }
        }
    
    const[productos, setProducto] = useState({
        nombre: '',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:'',
        categoriaId:''
    });

    const{nombre, descripcion, stock, precio, imagen} = productos;

    
    const onChange = (e) =>{
        setProducto({
            ...productos,
            [e.target.name]: e.target.value,
      [document.getElementById('categoriaId').name]: document.getElementById('categoriaId').value
        })
    };

    const crearProducto = async () =>{
        if(productos.nombre === '' || productos.descripcion === '' || productos.stock === '' || productos.precio === '' || productos.imagen === ''){
            return swal({
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
            nombre: productos.nombre,
            description: productos.descripcion,
            stock: productos.stock,
            precio: productos.precio,
            imagen: productos.imagen,
            categoriaId: productos.idCategoria
        }

        //console.log(data);
        
    try{
      await crud.POST('/api/productos', data);

        swal({
            title:'Producto creado satisfactoriamente',
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
        localStorage.setItem('category-to-display-products', data.categoriaId);
    
         
    }catch(error){
        return swal({
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
   
        const onSubmit = (e) =>{
            e.preventDefault();
            crearProducto();
}
   

    (
      <>
        <Header/>
        <div className= "md:flex md:min-h-screen">
        <Sidebar/>
        <main className="flex-1"> 
        <div className= "mt-10 flex justify-center">
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
        crear Productos
        </h1> 
        </div>

        <div className= "mt-10 flex justify-center">
        <form 
        onSubmit={onSubmit}
        className="my-10 bg-white shadow roun-lg p-10"
     >
          <div className= "my-5">
            <label className = "uppercase text-gray-600 block-lx font-bold">  Nombre </label>
                <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={nombre}
                onChange={onChange}
                />
            <label className = "uppercase text-gray-600 block-lx font-bold">  descripcion </label>
                <input
                type="text"
                id="descripcion"
                name="descripcion"
                placeholder="descripcion"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={descripcion}
                onChange={onChange}
                />
                <label className = "uppercase text-gray-600 block-lx font-bold">  stock </label>
                <input
                type="number"
                id="stock"
                name="stock"
                placeholder="stock"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={stock}
                onChange={onChange}
                />
                <label className = "uppercase text-gray-600 block-lx font-bold">  precio </label>
                <input
                type="number"
                id="precio"
                name="precio"
                placeholder="precio"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={precio}
                onChange={onChange}
                />

                <label className = "uppercase text-gray-600 block-lx font-bold"> Imagen </label>
                <input
                type="text"
                id="imagen"
                name="imagen"
                placeholder="imagen"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={imagen}
                onChange={onChange}
                />   


            </div>  
            <input
                type="submit"
                value="Crear Productos"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-400 transition-colors"
            />
         
                 
           </form>
            

        </div>
        </main>

        </div>
        </>    
    
    );

  

export default CrearProductos;