const { Router } = require('express');
routerProductos = Router();


const getAll =  async (req, res) => {
    try {
      const productos = req.app.get('productos')
      const allProductos = await productos.getAll()
      res.status(200).json({'productos': allProductos})
    }
    catch(e) {
      console.log(e)
    }
  }
  
  const getProductId = async (req, res, err) => {
    try {
      const productos = req.app.get('productos')
      const id = parseInt(req.params.id)
      const producto = await productos.getProductId(id)
      if (producto) {
        res.status(200).json({ producto })
      }
      else {
        err({'error': `Producto con id ${id} no disponible`})
      }
    }
    catch(e) {
      console.log(e)
    }
  }
  
   const addProduct = async (req, res, err) => {
    try {
      const adminLog = req.app.get('adminLog')
      if (adminLog) {
        const productos = req.app.get('productos')
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        if (nombre == null || descripcion == null || codigo == null || foto == null || precio == null || stock == null){
          err({'error': 'No hay suficiente información'})
        }
        else {
          const producto = await productos.addProduct(nombre, descripcion, codigo, foto, precio, stock )
          res.status(200).json({ producto })
        }
      }
      else
        err({'error': -1, 'descripcion': `ruta ${req.originalUrl} metodo ${req.method} no implementada`})  }
    catch(e) {
      console.log(e)
    }
  }
  
    const modifyProduct = async (req, res, err) => {
    try {
      const adminLog = req.app.get('adminLog')
      if (adminLog) {
        const productos = req.app.get('productos')
        const id = parseInt(req.params.id)
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        const producto = await productos.modifyProduct(id, nombre, descripcion, codigo, foto, precio, stock)
        if (producto){
          res.status(200).json({ producto })
        }
        else {
          err({'error': `Producto con id ${id} no disponible`})
        }
      }
      else
        err({'error': -1, 'descripcion': `ruta ${req.originalUrl} metodo ${req.method} no implementada`})
    }
    catch(e) {
      console.log(e)
    }
  }
  
  const deleteProduct = async (req, res, err) => {
    try {
      const adminLog = req.app.get('adminLog')
      if (adminLog) {
        const productos = req.app.get('productos')
        const id = parseInt(req.params.id)
        const deleted = productos.deleteProduct(id)
        if (deleted) {
          res.status(200).json({ 'Mensaje': 'Producto eliminado' })
        }
        else {
          err({'error': `Producto con ${id} no disponible`})
        }
      }
      else
        err({'error': -1, 'descripcion': `ruta ${req.originalUrl} metodo ${req.method} no implementada`})
    }
    catch(e) {
      console.log(e)
    }
  }
  
  module.exports = {getAll, getProductId, addProduct, modifyProduct, deleteProduct}