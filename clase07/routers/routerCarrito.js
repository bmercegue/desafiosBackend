const fs = require('fs');
const { Router} = require('express');
const routerCarrito = new Router();

const carrito = require('../api/carrito');

routerCarrito.post('/', (req, res) => {
    res.json(carrito);
});

//Recibe y agrega 1 producto, devuelve por id asignado
routerCarrito.post('/', (req, res) => {
    let idProd = products.reduce((max,obj) => (obj.id > max ? obj.id: max), 0);
    idProd++;

    const {title='', price='', thumbnail=''} = req.body
    products.push({id: idProd, title, price, thumbnail});
    res.json({id: idProd, title, price, thumbnail})
});

//Devuelve un producto según id
routerCarrito.get('/:id/products', (req, res) => {
    const id = parseInt(req.params.id)
    let result = carrito.find(obj => (obj.id===id))
    if(!result) {
        return res.json({Error: 'Carrito no encontrado'})
    }
    return res.json(result);
});

//Elimina producto según id
routerCarrito.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let result = carrito.find(obj => (obj.id===id))
    if(!result) {
        return res.json({Error: 'Carrito no encontrado'})
    }
    carrito.forEach((e, index)=> {
        if(e.id===id) {
            carrito.splice(index,1)
        }
    });
    return res.json(result)
});



module.exports = Router;