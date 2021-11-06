const express = require('express');
const routerProducts = require('./router/routerProducts');
const app = express();

//const products = [];

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './views');
app.set('view engine','ejs');

app.use('/products', routerProducts);


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http en el puerto ${server.address().port}`)        
});
server.on("error", error => console.log(`Error en servidor ${error}`));

