const express =  require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('1a entrega Proyecto Final')
})

const routerProducts = require('../routers/routerProducts');
const routerCarrito = require('../routers/routerCarrito');

app.use('/products', routerProducts);
app.use('/carrito', routerCarrito);


const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))