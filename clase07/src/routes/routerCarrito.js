const { Router} = require('express');
const routerCarrito = new Router();

const { createCart, 
        deleteCart,
        getProducts,
        addProductToCart,
        deleteCartProduct,} = require('../controllers/carrito');

const adminLog = true;


routerCarrito.post('/', createCart);

routerCarrito.delete('/:id', deleteCart);

routerCarrito.get('/:id/productos', getProducts);

routerCarrito.post('/:id/productos', addProductToCart);

routerCarrito.delete('/:id/productos/:id_prod', deleteCartProduct);


module.exports = Router;