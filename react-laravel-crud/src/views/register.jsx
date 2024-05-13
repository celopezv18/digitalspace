import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";
import IMAGES from '../assets/img/Images'

export default function register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}
    
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <form onSubmit={submit}>
                    <img src={IMAGES.logo} className="logo" width={100} />
                    <h1 className="title">Crear una cuenta</h1>
                    <input ref={nameRef} required type="text" placeholder="Nombre" />
                    <input ref={emailRef} required type="email" placeholder="Email" />
                    <input ref={passwordRef} required type="password" placeholder="Contraseña" />
                    <button className="btn btn-block">Entrar</button>
                    <p className="message">
                        Ya tienes una cuenta?<br /> 
                        <Link to='/login'>Entrar a mi cuenta</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}