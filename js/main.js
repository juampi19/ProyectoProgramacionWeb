import { buscarProductos } from "./services/productos.provider.js";


const initApp = () => {
    buscarProductos();
}

document.addEventListener( 'DOMContentLoaded', () => {
    initApp();
} );