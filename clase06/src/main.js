const express = require('express');
const hbs = require('express-handlebars');

const Contenedor = require('./Contenedor.js');

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const products = []
const messages = new Contenedor('messages.txt');

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')

    socket.emit('products', products)
    
    socket.on('update', product => {
        products.push(product)
        io.sockets.emit('products', products)
    })
    
    socket.emit('messages', messages);

    socket.on('updateMessage', async message => {
        await messages.save(message)
        io.sockets.emit('messages', await messages.getAll())
    })
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutDir: '/views/layouts',
}));

app.set('view engine', 'hbs');
app.set('views', "./views");

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

