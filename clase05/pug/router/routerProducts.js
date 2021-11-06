const { Router} = require('express');
const routerProducts = new Router();

const products = [];


routerProducts.get('/', (req, res) => {
    res.render('form');
});

routerProducts.get('/historial', (req, res) => {
    res.render('historial', {products, someProduct:1}); 
});


routerProducts.post('/', (req, res) => {
    let idProd = products.reduce((max,obj) => (obj.id > max ? obj.id: max), 0);
    idProd++;

    const {title='', price='', thumbnail=''} = req.body
    products.push({id: idProd, title, price, thumbnail});
    if (products.length>0) {
        res.render('historial', {products, someProduct:1});
    } else {
        res.render('products');
    }
});

module.exports = routerProducts;