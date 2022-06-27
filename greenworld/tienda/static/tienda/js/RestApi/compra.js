import mostrarProductos from "./productosApi.js";
import { getProductos } from "./api.provider.js";

let productosArr = [];
let carritoArr = [];
export let productosLocal = [];
const ContenedorCarrito = document.querySelector( '#lista-carrito tbody' );
const vaciarCarrito = document.querySelector( '#vaciar-carrito' );

 //vaciar el carrito
 vaciarCarrito.addEventListener( 'click', () => {
    carritoArr = [];
    limpiarHTML();
    carritoLocalStorage();
    window.location.reload();
    sincronizarProductos( productosArr );
    mostrarProductos( productosArr );
} );


document.addEventListener( 'DOMContentLoaded', async () => {
    const datos = await getProductos();
    productosArr = datos;

    //LocalStorage
    carritoArr = JSON.parse( localStorage.getItem( 'carrito' ) ) || [];
    imprimirCarrito();  

    productosLocal = JSON.parse( localStorage.getItem( 'productos' ) ) || productosArr;
    mostrarProductos( productosLocal );
 
} );




export const comprarProducto = () => {
    const contenedor = document.querySelector( '.api-root' );
    contenedor.addEventListener( 'click', generarCompra );
}

const generarCompra = ( e ) => {
    //Ubicamos el boton de compra
    e.preventDefault();
    if( e.target.classList.contains( 'btn-agregar' ) ){
        //obtener el id del cliente
        const id = parseInt( e.target.dataset.cliente );
        //obtenemos los datos
        const datos = e.target.parentElement.parentElement;
        leerDatos( datos );

        //imprimimos el carrito

    }
}

const leerDatos = (producto) => {
    let id = producto.querySelector( 'a' ).getAttribute('data-cliente');
    let stock = Number(producto.querySelector( '.stock' ).textContent);

        if( stock >=1 ){

            const productosActualizados =  productosArr.map( producto => {
                if( producto.id === Number(id) ) {
                    producto.prod_stock--;
                    return producto;
                }else {
                    return producto;
                }
            } );

            sincronizarProductos( productosActualizados );

            mostrarProductos( productosActualizados );  

            addCarrito( producto );
        }

        
        
    
}

const addCarrito = ( producto ) => {
    //Creamos el objeto con el div seleccionado
    const productoObj = {
        imagen: producto.querySelector( 'img' ).src,
        titulo: producto.querySelector( '.card-title' ).textContent,
        precio: Number(producto.querySelector( '.precio' ).textContent),
        id:     producto.querySelector( 'a' ).getAttribute('data-cliente'),
        cantidad: 1
    }
   
    //Comprobamos si existe en el carrito 
    const existe = carritoArr.some( producto => producto.id ===  productoObj.id  );

    if( existe ) {
        //Modificamos el producto si ya existe
        const carritoActualizado = carritoArr.map( producto => {
            if( producto.id === productoObj.id ) {
                producto.cantidad++;
                return producto;
            }else {
                return producto;
            }
        } );

        //reemplazamos el arreglo anterior con el actualizada
        carritoArr = [ ...carritoActualizado ];
    }else {
        //Si el el producto no existe lo agregamos al arreglo
        carritoArr = [ ...carritoArr, productoObj ];
    }

    //imprimimos el html del carrito
    imprimirCarrito();
}

const imprimirCarrito = () => {

    limpiarHTML();
    
    carritoArr.forEach( producto => {
        const {imagen, titulo, precio, cantidad, id} = producto;

        //Script para el carrito
        const row = document.createElement( 'tr' );
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        ContenedorCarrito.appendChild( row );

        carritoLocalStorage();

    } );
}

//Borramos el html existente y lo generamos de nuevo
function limpiarHTML() {
    while( ContenedorCarrito.firstElementChild ) {
        ContenedorCarrito.removeChild( ContenedorCarrito.firstElementChild );
    }
};

//Agregamos el arreglo al localstorage
function carritoLocalStorage() {
    localStorage.setItem( 'carrito', JSON.stringify( carritoArr ) );
}

function sincronizarProductos( productos ) {
    localStorage.setItem( 'productos', JSON.stringify( productos ) );
}