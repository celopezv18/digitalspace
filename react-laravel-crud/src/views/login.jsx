import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";
import IMAGES from '../assets/img/Images'

export default function login(){

    //referencias de campos de email y password
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    //manejar envío de formulario de login
    const Submit =  (ev) =>{
        ev.preventDefault();
        //datos a enviar
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        //peticion ajax para enviar los datos de login
        axiosClient.post("/login",payload).then(({data})=>{
            //inicializar states de usuario y token que son devueltos por axios
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        //manejos de errores durante el login
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
    }

    return(
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                   Ingresa a tu cuenta
                </h1>
                <form onSubmit={Submit}>
                <img src={IMAGES.logo} className="logo" width={100} />
                <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Contraseña" />
                    <button className="btn btn-block">Entrar</button>
                    {/*<p className="message">
                        No tienes cuenta?<br /> 
                        <Link to= '/register'>Crear una cuenta</Link>
                    </p> */}
                </form>
            </div>
        </div>
    )
}