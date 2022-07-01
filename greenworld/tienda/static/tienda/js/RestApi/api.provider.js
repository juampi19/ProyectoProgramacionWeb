const urlProductos = 'http://127.0.0.1:8000/api/producto';

//Realizando el GET de los productos
export const getProductos = async () => {
    try {
        const respuesta = await fetch( urlProductos );
        return await respuesta.json();
    } catch (error) {
        console.log( error );
    }
}