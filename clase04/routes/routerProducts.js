const { Router} = require('express');
const routerProducts = new Router();

const products = [];
/*{id:1, title:'prod1', price:200, thumbnail:'link'},
{id:2, title:'prod2', price:300, thumbnail:'link'},
{id:3, title:'prod3', price:400, thumbnail:'link'}*/

//Devuelve todos los productos
routerProducts.get('/', (req, res) => {
    res.json(products);
});

//Recibe y agrega 1 producto, devuelve por id asignado
routerProducts.post('/', (req, res) => {
    let idProd = products.reduce((max,obj) => (obj.id > max ? obj.id: max), 0);
    idProd++;

    const {title='', price='', thumbnail=''} = req.body
    products.push({id: idProd, title, price, thumbnail});
    res.json({id: idProd, title, price, thumbnail})
});

//Devuelve un producto según id
routerProducts.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let result = products.find(obj => (obj.id===id))
    if(!result) {
        return res.json({Error: 'Producto no encontrado'})
    }
    return res.json(result);
});

//Recibe y actualiza producto según id
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

//Elimina producto según id
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

module.exports = routerProducts;