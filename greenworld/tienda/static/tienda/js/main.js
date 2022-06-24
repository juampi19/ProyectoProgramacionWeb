import { validarFormulario } from "./validation/formulario.js";
import productosApi from './RestApi/productosApi.js';

document.addEventListener( 'DOMContentLoaded',() => {
    initApp();
} );


const initApp = () => { 
    validarFormulario();
    productosApi();
}


