import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function users(){
    const [users, setUsers] = useState([]);
    let [usersFiltered, setUsersFiltered] = useState([]); //almacena datos cuando se busca un usuario
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('');

    const {user, token, setUser, setToken} = useStateContext();
   
    useEffect(()=> {
        //obtener todos los usuarios
        getUsers();
        //obtener el usuario actual
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data) //objeto de usuario
             setUserRole(data.name.split('----')[1]) //rol de usuario
          })
    }, [])

    //si el rol de usuario no es admin, se direcciona al home
    if(userRole === 'Funcionario'){
        return <Navigate to='/'/>
    }

    //eliminar usuario
    const onDeleteClick = user => {
        if (!window.confirm("Desea eliminar este usuario?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            getUsers()
          })
      }

    //obtener todos los usuarios
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
          .then(({ data }) => {
            setLoading(false) //quitar texto de cargando
            setUsers(data.data) //setear objeto de usuarios
            setUsersFiltered(data.data) //pasar datos a objeto de filtro de datos
          })
          .catch(() => {
            setLoading(false)
          })
      }

      //buscar usuario
      const searchUser = (e) => {
        //verificar que el state users tenga datos
        if(users){
            //filtrar el email teniendo en cuenta el texto ingresado por el usuario
            const byName = (elm) => {
                return elm.email.toLowerCase().includes(e.target.value.toLowerCase())
            }
            setUsersFiltered(users.filter(byName)) //llenar objeto filtrado
        }
      }

    return(
        <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Usuarios</h1>
          <Link className="btn-add" to="/users/new">Crear nuevo usuario</Link>
        </div>
        <br />
        <div className="search">
            <input type="text" placeholder="Buscar: Ingresa el correo electrónico"  
             onChange={e => searchUser(e)} />
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Cargando...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {usersFiltered.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name.split('----')[0]}</td>
                  <td>{u.email}</td>
                  <td>{u.name.split('----')[1]}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Editar</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}