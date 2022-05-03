import { consultarImagenes } from "../main.js"

const initApp = () => {
    consultarImagenes();
}

document.addEventListener( 'DOMContentLoaded', () => {
    initApp();
} );