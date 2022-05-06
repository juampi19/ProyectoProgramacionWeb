import { consultarImagenes } from "./services/galeria.provider.js";


const initApp = () => {
    consultarImagenes();
}

document.addEventListener( 'DOMContentLoaded', () => {
    initApp();
} );