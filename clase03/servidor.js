const express = require('express');
const app = express();
const PORT = 8080


const Contenedor = require('./Contenedor');
let contenedor = new Contenedor('productos.txt');

app.get('/', (req, res) => {
    const bienvenida = `Ver /productos y /productoRandom`
    res.send(bienvenida)
})

app.get('/productos', async (req, res) => {
    const todos = await contenedor.getAll();
    res.send(todos)
})

app.get('/productoRandom',async (req, res) => {
    const prod = await contenedor.getRandom();
    res.send(prod)
})


const server = app.listen(PORT, () => {
    console.log(`Servidor http en el puerto ${server.address().port}`)        
})
server.on("error", error => console.log(`Error en servidor ${error}`))

