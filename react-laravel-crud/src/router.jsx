import { createBrowserRouter } from 'react-router-dom'
import Login from './views/login.jsx'
import Register from './views/register.jsx'
import DefaultLayout from './components/DefaultLayout.jsx'
import GuestLayout from './components/GuestLayout.jsx'
import Users from './views/users.jsx'
import UserForm from './views/userForm.jsx'
import ProductForm from './views/productForm.jsx'
import Products from './views/products.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key='userCreate' />
            },
            {
                path: '/users/:id',
                element: <UserForm key='userUpdate' />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/products/new',
                element: <ProductForm key='productCreate' />
            },
            {
                path: '/products/:id',
                element: <ProductForm key='productUpdate' />
            }
        ]
    },
    
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
])

export default router