import { getProductos } from "./api.provider.js";


document.addEventListener( 'DOMContentLoaded', () => {
    const contenedor = document.querySelector( '.api-root' );
    contenedor.classList.add( 'row' );
} );

//Creando el listado de los productos
const mostrarProductos = async () => {
    
    const productos = await getProductos();
    
    productos.forEach( producto => {
        const { id, prod_nombre, prod_precio, prod_descripcion, prod_stock, prod_img } = producto;
        const productoContenedor = document.createElement( 'div' );
        productoContenedor.classList.add( 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4' );

        productoContenedor.innerHTML += `
        <div class="">
            <div class="card">
                ${ prod_img ? `<img class="card-img-top" src="${prod_img}" alt="Card image cap">` : `<img class="card-img-top" src="/static/tienda/img/default.png" alt="Card image cap">` }
                
                <div class="card-body d-flex flex-column justify-content-center text-center py-4">
                    <p class="card-title text-center fs-2 fw-bold">${prod_nombre}</p>
                    <p class="card-text fw-bold">${prod_precio}</p>
                    <p class="card-text">${prod_descripcion}</p>
                    <p class="card-text">Stock: <span class="fw-bold">${prod_stock} Unidades</span></p>
                    <a href="#" class="btn-agregar">Comprar</a>
                </div>
            </div>
        </div>
        
        `
        contenedor.appendChild( productoContenedor );
    } );

}

export default mostrarProductos;