const express = require('express');
const app = express();
const routerProducts = require('./routes/routerProducts');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/products', routerProducts);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http en el puerto ${server.address().port}`)        
});
server.on("error", error => console.log(`Error en servidor ${error}`))

