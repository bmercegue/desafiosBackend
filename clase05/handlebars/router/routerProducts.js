const { Router} = require('express');
const routerProducts = new Router();

const products = [];

routerProducts.get('/', (req, res) => {
    res.render('form', {products});
});

routerProducts.get('/historial', (req, res) => {
    res.render('historial', {products})
});

routerProducts.post('/', (req, res) => {
    let idProd = products.reduce((max,obj) => (obj.id > max ? obj.id: max), 0);
    idProd++;

    const {title='', price='', thumbnail=''} = req.body
    products.push({id: idProd, title, price, thumbnail});
    console.log({id: idProd, title, price, thumbnail})
    res.render('historial', {products})
});

module.exports = routerProducts;