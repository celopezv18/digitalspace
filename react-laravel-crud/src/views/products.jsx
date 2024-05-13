import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function products(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
   
    useEffect(()=> {
        //consultar todos los productos
        getProducts();
    }, [])

    //manejar la eliminación del producto
    const onDeleteClick = product => {
        if (!window.confirm("Desea eliminar este producto?")) {
          return
        }
        axiosClient.delete(`/products/${product.id}`)
          .then(() => {
            getProducts()
          })
      }

      //función que trae los productos
      const getProducts = () => {
        setLoading(true) //texto de cargando
        axiosClient.get('/products')
          .then(({ data }) => {
            setLoading(false) //quitar texto de cargando
            setProducts(data.data) //asignar objeto de productos
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Productos</h1>
          <Link className="btn-add" to="/products/new">Crear nuevo producto</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
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
              {products.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.price}</td>
                  <td>{u.stock}</td>
                  <td>
                    <Link className="btn-edit" to={'/products/' + u.id}>Editar</Link>
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