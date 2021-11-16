const fs = require('fs')
const loadProduct = require('../../persistance/productos.json');

class Productos {
  constructor() {
    if(!fs.existsSync(loadProduct))
      fs.writeFileSync(loadProduct, JSON.stringify([]))
  }

  getLastId(productos) {
    if(productos.length) {
      return productos[productos.length - 1].id + 1
    } else {
      return 1
    }
  }

  async getAll() {
    const data = JSON.parse(fs.readFileSync(loadProduct, 'utf-8'))
    return data
  }

  async addProduct(nombre, descripcion, codigo, foto, precio, stock) {
    const productos = await this.getAll()
    console.log(productos)
    const producto = { 
      'timestamp': Date.now(), 
      nombre,      
      descripcion,  
      codigo,   
      foto, 
      precio, 
      stock
    }
    producto['id'] = this.getLastId(productos)
    productos.push(producto)
    fs.writeFileSync(loadProduct, JSON.stringify(productos, null, 2))
    return producto
  }

  async getProductId(id) {
    const productos = await this.getAll()
    const producto = productos.filter(e => e.id == id)
    if (producto) {
      return producto[0]
    } else {
      return null
    }
  }

  async modifyProduct(id, nombre, descripcion, codigo, foto, precio, stock) {
    const productos = await this.getAll()
    const index = productos.findIndex(e => e.id == id)
    if (index >= 0) {
      productos[index] = {...productos[index], ...{nombre, descripcion, codigo, foto, precio, stock}}
      fs.writeFileSync(loadProduct, JSON.stringify(productos, null, 2))
      return productos[index]
    } else {
      return null
    }
  }

  async deleteCartProduct(id) {
    const productos = await this.getAll()
    const index = productos.findIndex(e => e.id == id)
    if (index >= 0) {
      productos.splice(index, 1)
      fs.writeFileSync(loadProduct, JSON.stringify(productos, null, 2))
      return 1
    } else {
      return 0
    }
  }
}

module.exports = Productos;