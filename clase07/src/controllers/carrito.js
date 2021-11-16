const { Router } = require('express');
carritoRouter = Router();


const createCart = async (req, res, err) => {
    const carts = req.app.get('carts')
    const cart = await carts.createCart()
    res.status(200).json({ cart })
}
  
const deleteCart = async (req, res, err) => {
    const carts = req.app.get('carts')
    const id = parseInt(req.params.id)
    const isDeleted = await carts.deleteCart(id)
    if (isDeleted) 
      res.status(200).json({'Mensaje': `Carrito con id ${req.params.id} eliminado`})
    else
      err({'error': 'Carrito vacío'})
}
  
const getProducts = async (req, res, err) => {
    const carts = req.app.get('carts')
    const id = parseInt(req.params.id)
    const productos = carts.getProducts(id)
    if (productos)
      res.status(200).send({ productos })
    else
      err({'error': 'Carrito vacío'})
}
  
const addProductToCart = async (req, res, err) => {
    try {
      const carts = req.app.get('carts')
      const productos = await req.app.get('productos').getAll()
      const id = parseInt(req.params.id)
      const idProd = parseInt(req.body.id_prod)
      const isAdded = await carts.addProductToCart(id, idProd, productos)
      if (isAdded)
        res.status(200).json({'Mensaje': 'Producto agregado'})
      else
        err({'error': 'Carrito vacío'})
    }
    catch (error){
      console.log(error)
    }
}
  
const deleteCartProduct = async (req, res, err) => {
    const carts = req.app.get('carts')
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.params.idProd)
    const isDeleted = await carts.deleteCartProduct(cartId, productId)
  
    if (isDeleted)
      res.status(200).json({'Mensjae': 'Producto eliminado'})
    else
      err({'error': 'Carrito vacío'})
}



module.exports ={createCart, deleteCart, getProducts, addProductToCart, deleteCartProduct}