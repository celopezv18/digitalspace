import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UserForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    //objeto de usuarios
    const [user, setUsers] = useState({
        id: null,
        name: '',
        email: '',
        rol: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    //si estamos editando un usuario
    if(id)
    {
        useEffect(() => {
            setLoading(true)
            //consultamos el usuario
            axiosClient.get(`/users/${id}`)
              .then(({data}) => {
                setLoading(false) //quitar texto de carga
                setUsers(data) //setear objeto de usuario
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    //manejar submit de formulario de usuario
    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) { //si estamos editando
          //hacemos la petición para actualizar usuario
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
              navigate('/users') //redireccionar a vista de usuarios
            })
            //manejar errores
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
            user.name = user.name+'----'+user.rol
            //crear nuevo usuario
            axiosClient.post('/users', user)
            .then(() => {
              navigate('/users') //redireccionar a vista de usuarios
            })
            //manejo de errores
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }
      }

    return(
    <>
      {user.id && <h1>Actualizar usuario: {user.name.split('----')[0]}</h1>}
      {!user.id && <h1>Nuevo usuario</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Cargando...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input required value={user.name.split('---')[0]} onChange={ev => setUsers({...user, name: ev.target.value})} placeholder="Nombre"/>
            <input required value={user.email} onChange={ev => setUsers({...user, email: ev.target.value})} placeholder="Email"/>
            <select required  
            onChange={ev => setUsers({...user, rol: ev.target.value})} 
            value={user.name.split('---')[1] === 'Administrador' ? 'Administrador' : 'Funcionario'}>
                <option value=''>Rol</option>
                <option value='Administrador'>Administrador</option>
                <option value='Funcionario'>Funcionario</option>
            </select>
            {!id && (
                <input required type="password" onChange={ev => setUsers({...user, password: ev.target.value})} placeholder="Contraseña"/>
            )}
            {id && (
                <input type="password" onChange={ev => setUsers({...user, password: ev.target.value})} placeholder="Contraseña"/>
            )}
            <button className="btn">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}