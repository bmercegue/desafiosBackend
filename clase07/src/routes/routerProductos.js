const { Router} = require('express');
const routerProductos = new Router();

const { getAll, 
        getProductId,
        addProduct,       
        modifyProduct,
        deleteProduct} = require('../controllers/productos');

const adminLog = true;

routerProductos.get('/', getAll);

routerProductos.get('/:id', getProductId);

routerProductos.post('/', addProduct);

routerProductos.put('/:id', modifyProduct);

routerProductos.delete('/:id', deleteProduct);



module.exports = Router;