import React, { useEffect, useState } from "react";
import { useNavigate, } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "../componentes/Header";
import Sidebar from "../componentes/Sidebar";
import swal from 'sweetalert';

const Admin = () =>{

    const navigate = useNavigate();

    useEffect(() =>{
        const autenticarUsuario = async() =>{
            const token = localStorage.getItem('token')
            //console.log(token)
            if(!token){
                navigate("/login");
            }
            else{
              const response = await crud.GET(`/api/auth`);
              if(!response.usuario) navigate("/login");
            }
        }
        autenticarUsuario()
       },[navigate]);//[]se ejecuta solo una vez


       const [categoria,setCategoria] = useState([]);

       const cargarCategorias = async () => {
        const response =await crud.GET('/api/categorias');
    
        setCategoria(response.categoria);
       }




       useEffect(() =>{
       cargarCategorias();
       },[]);

       
    const [categoriaEdit, setCategoriaEdit] = useState({
      idCategoriaEdit: '',
      nombreEdit: ''
  
    });
      
    
    const onChangeEdit = (e) =>{
      setCategoriaEdit({
        ...categoriaEdit,
        [e.target.name]: e.target.value
      });
    };

    const onSubmitEdit = (e) => {
      e.preventDefault();
      actualizarCategoria();
      document.getElementById('updateFormModal').classList.add('display-none');
    }

    const displayUpdateForm = async (idCategoria) => {
      categoriaEdit.idCategoriaEdit = idCategoria;
      document.getElementById('updateFormModal').classList.remove('display-none');
    }

    const actualizarCategoria = async () => {
      const data = {
        nombre: categoriaEdit.nombreEdit,
        imagen: categoriaEdit.imagenEdit
      }
      const idCategoria = categoriaEdit.idCategoriaEdit;
      //if(nombreEdit === "") delete data.nombreEdit;
      //else if(imagenEdit === "") delete data.imagenEdit;

      try{
        const response = await crud.PUT(`/api/categorias/${idCategoria}`, data);
        console.log(response);

        window.location.reload();

        swal({
          title: 'Actualizando categoría',
            buttons: {
              confirm: {
                visible: false,
              }
            }
        });
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

       const borrarCategoria = async (e, idCategoria) => {
        swal({
            title:'Estas seguro de eliminar esta categoria?',
            text: "una vez eliminado no podra recuperar esta categoria",
            icon:'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete) {
                e.preventDefault();
                const response = crud.DELETE(`/api/categorias/${idCategoria}`);
                //console.log(response.msg);
                const mensaje = response.msg;
                if(response){
                    swal("su categoria ha sido eliminada correctamente",{
                        icon: "success",
                    });
                }
                cargarCategorias();
            }else {
                swal("se cancelo la acción");
            }
        });

    }

   
  
    return (
        <>
        <Header/>
    <div className= "md:flex md:min-h-screen">
            <Sidebar/>
    <main className= "flex-1">
            <h1 className="inline bg-gradient-to-r from-red-400 via-black-700 to-red-400 bg-clip-text font-display text-5xl tracking-tight text-transparent">
            lista de categorias
        </h1>
    <div>
      <table>
        <thead className="bg-white">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>ID</th>
            <th>Opciónes</th>
          </tr>
        </thead>


        <tbody className="bg-white">
          {
            categoria.map(
              item => 
              <tr key={item._id}>
                <td><img src={item.imagen} width="150" height="150"></img></td>
                <td>{item.nombre}</td>
                <td>{item._id}</td>
                <td>
                <input 
                type="submit"
                value="Eliminar"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
               onClick={(e) => borrarCategoria(e, item._id)}
            />
             <input 
                type="submit"
                value="Actualizar"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
                onClick={(e) => actualizarCategoria(item._id)}
            />
             
           
                </td>
              </tr>
            )
          }

        </tbody>

      </table>
    </div>
  </main>
</div>
    </>
    );
}

export default Admin;