const express = require('express');
const app = express();

const routerCarrito = require('./routes/routerCarrito');
const routerProductos = require('./routes/routerProductos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const administrator = true

app.set('adminLog', administrator);


app.get('/isAdmin', (req, res) => {
    res.json({'admin': administrator})
});

app.get('//', (req, res) =>{
    res.status(404).send({'error': -2,'descripcion':`Ruta${req.originalUrl} con metodo ${req.method} no implementada.`})
});


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))