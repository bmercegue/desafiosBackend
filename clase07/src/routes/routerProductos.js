const { Router} = require('express');
const routerProductos = new Router();

const { getAll, 
        getProduct,
        addProduct,       
        modifyProduct,
        removeProduct,} = require('../../controllers/producto');

const admin = true;

routerProductos.get('/', getAll);

routerProductos.get('/:id', getProduct);

routerProductos.post('/', addProduct);

routerProductos.put('/:id', modifyProduct);

routerProductos.delete('/:id', removeProduct);



module.exports = Router;