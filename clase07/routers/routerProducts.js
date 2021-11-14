const fs = require('fs');
const { Router} = require('express');
const routerProducts = new Router();

const products = [];

routerProducts.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let result = products.find(obj => (obj.id===id))
    if(!result) {
        return res.json({Error: 'Producto no encontrado'})
    }
    return res.json(result);
});

routerProducts.post('/', (req, res) => {
    let idProd = products.reduce((max,obj) => (obj.id > max ? obj.id: max), 0);
    idProd++;

    const {title='', price='', thumbnail=''} = req.body
    products.push({id: idProd, title, price, thumbnail});
    res.json({id: idProd, title, price, thumbnail})
});


routerProducts.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {title='', price='', thumbnail=''} = req.body
    let result = products.find(obj => (obj.id===id))
    if(!result) {
        return res.json({Error: 'Producto no encontrado'})
    }
    products.forEach((e, index) => {
        if(e.id===id) {
            products.splice(index, 1)
        }
    });
    products.push({id: result.id, title, price, thumbnail})
    return res.json({id: result.id, title, price, thumbnail})
});

routerProducts.delete('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let result = products.find(obj => (obj.id===id))
    if(!result) {
        return res.json({Error: 'Producto no encontrado'})
    }
    products.forEach((e, index)=> {
        if(e.id===id) {
            products.splice(index,1)
        }
    });
    return res.json(result)
});



module.exports = Router;