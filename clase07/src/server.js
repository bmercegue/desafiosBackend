const express = require('express');
const app = express();

const routerCarrito = require('../routes/routerCarrito');
const routerProductos = require('../routes/routerProductos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.use(function(req, res) {
    res.json({
        error: -2,
        descripcion: `ruta '${req.url}' metodo '${req.method}' no implementada.`, 
    });
});


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))