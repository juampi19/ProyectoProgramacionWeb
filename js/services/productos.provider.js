const urlProductos = 'https://productos-api-rest.herokuapp.com/productos';
const productosContenedor = document.querySelector( '.productos-app' );
const input = document.querySelector( '#filtrarProducto' );

//Variable para almacenar el arreglo y poder filtrarlos
let productos =[];

document.addEventListener( 'DOMContentLoaded', async() => {
    const datos = await buscarProductos();
    productos = datos;
    mostrarProductos( productos );

} );

//Para poder filtrar los productos
input.addEventListener( 'keyup', (  ) => {
    const nuevosProductos = productos.filter( producto => producto.nombre.toLowerCase().includes( input.value.toLowerCase() ) );

    mostrarProductos( nuevosProductos );

} );

const buscarProductos = async () => {
    
    //Consutamos nuestra api con fetch y async y await
    const response = await fetch( urlProductos );
    
    return await response.json();

}

//Funcion para crear el html sobre los productos consultados en la API
const mostrarProductos = ( productos ) => {

    limpiarHtml()

    productos.forEach( producto => {
        //Destructuring del objeto
        const { nombre, precio } = producto;
        
        //Contenedor del producto
        const productoDiv = document.createElement( 'div' );
        productoDiv.classList.add( 'col-sm-6','col-md-4', 'col-lg-3', 'mb-4' );

        //creacion del html
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

const limpiarHtml = () => {
    while( productosContenedor.firstChild ) {
        productosContenedor.removeChild( productosContenedor.firstChild );
    }
}

