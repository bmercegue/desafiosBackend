const express = require('express');
const app = express();
const routerProducts = require('./router/routerProducts');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/products', (req, res) => {
   res.render('form');
});

app.post('/historial', (req, res) => {
    res.render('historial');
});

app.use('/products', routerProducts);


const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));