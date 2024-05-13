import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";
import { Link } from "react-router-dom";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    const [userRole, setUserRole] = useState('');
    const [realUser, setRealUser] = useState('');
    
    //función que maneja el cierre de sesión
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           //seteo de variables state referentes a la sesión
           setUser(null)
           setToken(null)
           setUserRole(null)
           setRealUser(null)
        })
    }

    useEffect(() => {
        //obtener usuario actual
        axiosClient.get('/user')
          .then(({data}) => {
            //setear states de datos de usuario 
            setUser(data)
             setUserRole(data.name?.split('----')[1])
             setRealUser(data.name?.split('----')[0]) 
          })
      }, [])
    
    //si el usuario no está logueado, se redirige al login
    if(!token){
       return <Navigate to='/login'/>
    }
    

    return(
        <div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                    Digital Space
                </div>
                <div>
                    {realUser}
                    <a href="#" onClick={onLogout} className="btn-logout"> Salir</a>
                </div>
            </header>
            <div className="menu">
                <ul>
                    {userRole === 'Administrador' && (
                        <li><Link to='/users'>Usuarios</Link></li>
                    )}
                    <li><Link to='/products'>Productos</Link></li>
                </ul>
                <div className="clear"></div>
            </div>
            <main>
            <Outlet />
            </main>
            </div>
        </div>
    )
}