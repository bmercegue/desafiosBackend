const express = require('express');
const app = express();
const routerProducts = require('./router/routerProducts');

const exphds = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.engine('hbs', exphds({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutDir: '/views/layouts',
}));

app.set('view engine', 'hbs');

app.set('views', "./views");

app.use('/products', routerProducts);


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http en el puerto ${server.address().port}`)        
});
server.on("error", error => console.log(`Error en servidor ${error}`));