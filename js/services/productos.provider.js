const urlProductos = 'https://productos-api-rest.herokuapp.com/productos';
const productosContenedor = document.querySelector( '.productos-app' );

const buscarProductos = () => {
    
    fetch( urlProductos )
        .then( response => response.json() )
        .then( resolve => mostrarProductos( resolve ) );

}

const mostrarProductos = ( productos ) => {
    productos.forEach( producto => {
        const { nombre, precio } = producto;
        //Contenedor del producto
        const productoDiv = document.createElement( 'div' );
        productoDiv.classList.add( 'col-sm-6','col-md-4', 'col-lg-3', 'mb-4' );

        const productoCard = document.createElement( 'div' );
        productoCard.classList.add( 'card', 'escalado' );
        productoCard.innerHTML = `
            <div class="overflow-hidden">
                <img src="${ producto.imagen.url }" class="card-img-top" alt="Imagen galeria">
            </div>
            <div class="card-body d-flex flex-column justify-content-center text-center py-4">
                <p class="card-text fw-normal fs-4">${ nombre }</p>
                <p class="card-text fw-bold">Precio: <span class="fw-light">$${ precio }</span></p>
                <a href="#" class="btn-agregar">Agregar al Carrito</a>
            </div>
        `;

        productoDiv.appendChild( productoCard );

        productosContenedor.appendChild( productoDiv );



    } );
}


export {
    buscarProductos
}