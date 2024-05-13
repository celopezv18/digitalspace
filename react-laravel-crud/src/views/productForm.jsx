import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function productForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    //objeto de producto
    const [product, setProducts] = useState({
        id: null,
        name: '',
        price: '',
        stock: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    //detectar si se pasa un parametro de id
    //para saber si se está creando o editando
    if(id)
    {
        useEffect(() => {
            setLoading(true) //lanzar texto de carga
            //consultar el producto con dicho id
            axiosClient.get(`/products/${id}`)
              .then(({data}) => {
                //quitar texto de carga y setear objeto  con datos de producto
                setLoading(false)
                setProducts(data.data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        //si estamos editando...
        if (product.id) {
          //actualizamos el producto
          axiosClient.put(`/products/${product.id}`, product)
            .then(() => {
              //luego redireccionamos a vista de productos
              navigate('/products')
            })
            //manejo de errores
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
            //creamos nuevo producto
            axiosClient.post('/products', product)
            .then(() => {
              //redireccionamos a vista de productos
              navigate('/products')
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
      {product.id && <h1>Actualizar producto: {product.name}</h1>}
      {!product.id && <h1>Nuevo producto</h1>}
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
            <input required value={product.name} onChange={ev => setProducts({...product, name: ev.target.value})} placeholder="Nombre"/>
            <input required value={product.price} onChange={ev => setProducts({...product, price: ev.target.value})} type="number" placeholder="Precio"/>
            <input required value={product.stock} onChange={ev => setProducts({...product, stock: ev.target.value})} type="number" placeholder="Stock"/>
            <button className="btn">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}