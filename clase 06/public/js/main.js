const socket = io();

Handlebars.registerHelper('formatDate', function(date) {
  return new Handlebars.SafeString(
      new Date(date).toLocaleString()
  );
});

const addProduct = document.getElementById("addProduct");
const addMessage = document.getElementById("addMessage");

addProduct.addEventListener('submit', e => {

  e.preventDefault()

  const product = {

    title: addProduct [ 0 ].value,
    price: addProduct [ 1 ].value,
    thumbnail: addProduct [ 2 ].value,
  }

  socket.emit('update', product);

  addProduct.reset()

})

  socket.on('products', manejarEventoProducts);

async function manejarEventoProducts(products) {
  const recursoRemoto = await fetch('views/products.hbs')

  const textoPlantilla = await recursoRemoto.text()

  const functionTemplate = Handlebars.compile(textoPlantilla)

  const html = functionTemplate({products})

  document.getElementById('products').innerHTML = html
}

 
addMessage.addEventListener('submit', e => {

  e.preventDefault()

  const message = {
    sender: addMessage [ 0 ].value,
    dateHour: new Date(),
    text: addMessage [ 1 ].value,
  }

  socket.emit('updateMessage', message);

  addMessage["newMessage"].value=""
  
})

  socket.on('messages', manejarEventoMessages);

async function manejarEventoMessages(messages) {
  const recursoRemoto = await fetch('views/messages.hbs')

  const textoPlantilla = await recursoRemoto.text()

  const functionTemplate = Handlebars.compile(textoPlantilla)

  const html = functionTemplate({ messages })

  document.getElementById('messages').innerHTML = html
}
