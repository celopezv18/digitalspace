# digitalspace
Aplicación de roles de usuario y CRUDs de usuarios y productos.

La aplicación contiene el backup del query sql 'pruebas.sql' en el directorio raíz, correrlo en el 
phpmyadmin que corre en su equipo.

El endpoint para el backend (laravel) se encuentra en react-laravel-crud/src/axiosClient.js: 

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

Para correr el proyecto en el frontend ir a react-laravel-crud y correr 'npm install' y luego
'npm run dev'

Para el backend (directorio raíz) correr: 'php artisan serve'

Para ingresar a la aplicación como usuario administrador usar los datos:
usuario: admin@admin.com
contraseña: 12345678a

La aplicación consiste en primera instancia de un login de usuarios simple que solicita correo y contraseña, al ingresar contamos con un header simple con el nombre del apllicativo en la parte izquierda y un botón de logout y el nombre del usuario logueado en la parte derecha.

Luego más abajo contamos con dos opciones de menú ('Usuarios' y 'Productos').
La opción de usuarios será visible o no dependiendo del rol del usuario logueado, solo el usuario administrador puede crear nuevos usuarios y asignarle su respectivo rol.

En el menú Usarios tenemos un CRUD sencillo donde se listan los usuarios registrados, podemos editar, eliminar y crear nuevos usuarios, también contamos con la opción de filtrar usuarios por correo electrónico, solo es necesario empezar a escribir para que empieze a buscar.

En el menú de productos tenemos la misma funcionalidad que en la de los usuarios, solo que este no uenta con la opción de filtro (por cuestión de requerimientos)

La aplicación fue construida con Vite, React y Laravel con un patrón de diseño MVC

Vite es una herramienta de construcción (build tool) para aplicaciones web que se centra en proporcionar una experiencia de desarrollo rápida y eficiente. Vite se destaca por su velocidad de desarrollo al aprovechar la capacidad de los navegadores modernos para cargar y ejecutar módulos ES Module (ESM) directamente durante el desarrollo, sin necesidad de transpilación o empaquetado previo.

En esta aplicación, aplicar el principio SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) implica diseñar cada componente y clase de manera que siga estos principios para mejorar la estructura, mantenibilidad y escalabilidad del código. Yo usé un diseño de componentes funcionales ya que no estoy muy familiarizado con el principio SOLID, 
a continuación doy según una pequeña investigación, que se podría hacer paa cumplir este pprincipio:

Single Responsibility Principle (SRP):

React Componentes Funcionales: Cada componente funcional en React debería tener una única responsabilidad y realizar una tarea específica. Por ejemplo, tendríamos un componente UserList que solo muestra la lista de usuarios, y un componente ProductForm que se encarga de manejar la creación o edición de productos.
Laravel Controllers: En Laravel, cada controlador debe tener una sola responsabilidad relacionada con la gestión de una parte específica del CRUD. Por ejemplo, tendríamos un controlador UserController para manejar las operaciones CRUD de usuarios y un controlador ProductController para manejar las operaciones CRUD de productos.
Open/Closed Principle (OCP):

React Componentes Funcionales: Los componentes funcionales en React deberían estar abiertos para extenderse con nuevas funcionalidades, pero cerrados para modificarse. Podríamos lograr esto utilizando técnicas como la composición de componentes y el uso de propiedades.
Laravel Models y Controladores: En Laravel, podemos aplicar el principio OCP mediante el uso de modelos y controladores que están abiertos para extenderse con nuevas funcionalidades a través de la herencia y la implementación de interfaces, pero cerrados para modificarse directamente.
Liskov Substitution Principle (LSP):

React Componentes Funcionales: En React, podríamos aplicar el principio LSP asegurándonos de que los componentes funcionales se puedan intercambiar entre sí sin afectar el comportamiento de la aplicación. Esto implica mantener una interfaz consistente y predecible para los componentes.
Laravel Controladores y Servicios: En Laravel, podríamos aplicar el principio LSP asegurándonos de que los controladores y servicios se puedan intercambiar entre sí sin introducir errores en la lógica de negocio. Esto implica definir interfaces claras y coherentes para los diferentes servicios y componentes.
Interface Segregation Principle (ISP):

React Componentes Funcionales: En React, podríamos aplicar el principio ISP asegurándonos de que los componentes funcionales no dependan de interfaces o propiedades que no necesiten. Esto implica dividir los componentes en componentes más pequeños y específicos que solo dependan de lo que necesiten.
Laravel Servicios y Controladores: En Laravel, podríamos aplicar el principio ISP asegurándonos de que los servicios y controladores no dependan de interfaces o métodos que no necesiten. Esto implica dividir la lógica de negocio en servicios más pequeños y específicos que solo proporcionen la funcionalidad necesaria.
Dependency Inversion Principle (DIP):

React Componentes Funcionales: En React, podríamos aplicar el principio DIP utilizando técnicas como la inyección de dependencias para proporcionar a los componentes las dependencias que necesitan en lugar de crearlas internamente.
Laravel Servicios y Controladores: En Laravel, podríamos aplicar el principio DIP asegurándonos de que los servicios y controladores dependan de abstracciones en lugar de implementaciones concretas. Esto implica utilizar interfaces y contenedores de servicio para administrar las dependencias de manera flexible.