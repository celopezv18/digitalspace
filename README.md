# digitalspace
Aplicación de roles de usuario y CRUDs de usuarios y productos.

La aplicación contiene el backup del query sql 'pruebas.sql' en el directorio raíz, correrlo en el 
phpmyadmin que corre en su equipo.

El endpoint para el backend (laravel) se encuentra en react-laravel-crud/src/axiosClient.js: 
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});