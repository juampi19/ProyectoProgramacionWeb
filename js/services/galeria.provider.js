
const galeriaDiv = document.querySelector( '#app' );
const paginacionDiv = document.querySelector( '#paginacion' );

//Variables para crear el paginador
const registroPorPagina = 32;
let totalPaginador;
let iterador;
let paginaActual = 1;

document.addEventListener( 'DOMContentLoaded', () => {
    consultarImagenes();
} );

//Funcion para consultar la API
const consultarImagenes = () => {

    let termino = 'plantas';
    const apiKey = '26055449-b413bea04546b8c11c8233c58';
    const urlImagenes = `https://pixabay.com/api/?key=${apiKey}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;
    
    
    fetch( urlImagenes )
        .then( response => response.json() )
        .then( resolve => {
            totalPaginador = calcularPaginador( resolve.totalHits ); //Obtenemos la cantidad de elementos
            mostrarImagenes( resolve.hits );
        } );
}

//Funcion para poder calcular la cantidad de paginadores, dependiendo de la cantidad de elementos que devuelva la consulta
const calcularPaginador = ( total ) => parseInt( Math.ceil( total / registroPorPagina ) );


//Creamos la funcion generadora, para poder imprimir el paginador en el html de forma mas controlada
function *crearPaginador( total ) {

    for( let i = 1; i <= total ; i++) {
        yield i;
    }
}


//Creamos el html para mostrar las imagenes
const mostrarImagenes = ( imagenes ) => {

    //Limpiamos el html previo
    limpiarHtml();

    imagenes.forEach( imagen => {
        //Destructuring del objeto
        const { previewURL, largeImageURL, user, likes, views } = imagen;

        //Creamos el html de las imagenes
        const imagenDiv = document.createElement( 'div' );
        imagenDiv.classList.add( 'col-md-4', 'col-lg-3', 'mb-4' );
        imagenDiv.innerHTML = `
            <div class="card">
                <img src="${ previewURL }" class="card-img-top" alt="Imagen galeria">
                <div class="card-body d-flex flex-column justify-content-center">
                    <p class="card-text fw-bold">Autor: <span class="fw-light">${ user }</span></p>
                    <p class="card-text fw-bold">Likes: <span class="fw-light">${ likes }</span></p>
                    <p class="card-text fw-bold">Veces Vista: <span class="fw-light">${ views }</span></p>
                    <a href="${ largeImageURL }" target="_blank" class="btn-all">Ver Imagen</a>
                </div>
            </div>
        `;

        galeriaDiv.appendChild( imagenDiv );


        
    } );

    //Limpiamos el paginador previo
    while( paginacionDiv.firstChild ) {
        paginacionDiv.removeChild( paginacionDiv.firstChild );
    }

    imprimirPaginador();
}

//Imprimimos el paginador
const imprimirPaginador = () => {
    //almacenamos la funcion generadora en la variable iterador
    iterador = crearPaginador( totalPaginador );
    
    //Iteramos hasta que el generador queden en true
    while( true ) {

        const { value, done } = iterador.next();
        if( done ) return;

        const boton = document.createElement( 'a' );
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add( 'paginacion' );

        //Agregamos el evento para cambiar de pagina
        boton.onclick = () => {

            paginaActual = value;

            consultarImagenes();
        }

        paginacionDiv.appendChild( boton ); 
    }
}

//limpiamos el html
const limpiarHtml = () => {
    while( galeriaDiv.firstChild ) {
        galeriaDiv.removeChild( galeriaDiv.firstChild );
    }
}
