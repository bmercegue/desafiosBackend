const fs = require('fs')
const loadCart = require('../../persistance/carrito.json');


class Carrito {
    constructor() {
      if (! fs.existsSync(loadCart))
        fs.writeFileSync(loadCart, JSON.stringify([]))
    }
  
    getLastId(carrito) {
      if(carrito.length) {
        return carrito[carrito.length - 1].id + 1
      } else {
        return 1
      }
    }
  
    async getAll() {
      const data = JSON.parse(fs.readFileSync(loadCart, 'utf-8'))
      return data
    }
  
    async createCart() {
      const carrito = await this.getAll()
      const id = this.getLastId(carrito)
      const carrito = {
        id,
        'timestamp': Date.now(),
        'productos': []
    }
        carrito.push(carrito)
        fs.writeFileSync(loadCart, JSON.stringify(carrito, null, 2))
            return carrito
    }
  
    async deleteCart(id) {
      const carrito = await this.getAll()
      const index = carrito.findIndex(e => e.id == id)
      if (index >= 0) {
        carrito.splice(index, 1)
        fs.writeFileSync(loadCart, JSON.stringify(carrito, null, 2))
        return 1
      } else {
        return 0
      }
    }
  
    async getProducts(id) {
      const carrito = await this.getAll()
      const carrito = carrito.find(e => e.id == id)
      if (carrito) {
        return carrito[0].productos
      } else {
        return null
      }
    }
  
    async addProductToCart(id, idProd, productos) {
      const carrito = await this.getAll()
      const indexCart = carrito.findIndex(e => e.id == id)
      if (indexCart >= 0) {
        const indexProduct = productos.findIndex(e => e.id == idProd)
        if (indexProduct >= 0){
          carrito[indexCarrito].productos.push(productos[indexProduct])
          fs.writeFileSync(loadCart, JSON.stringify(carrito, null, 2))
          return 1
        } else
          return 0
      } else
        return 0
    }
  
    async deleteProduct(id, idProd) {
      const carrito = await this.getAll()
      const indexCart = carrito.findIndex(e => e.id == id)
      if (indexCart >= 0) {
        const indexProduct = carrito[indexCart].productos.findIndex(e => e.id == idProd)
        if (indexProduct >= 0) {
          carrito[indexCart].productos.splice(indexProduct, 1)
          fs.writeFileSync(loadCart, JSON.stringify(carrito, null, 2))
          return 1
        } else
          return 0
      } else 
        return 0
    }
  
    async getProducts(id) {
      const carrito = await this.getAll()
      const indexCart = carrito.findIndex(e => e.id == id)
      if (indexCart) {
        return carrito[indexCart].productos
      } else 
        return null
    }
}


module.exports = Carrito;