const fs = require('fs');

class Carrito {
    constructor () {
        this.id = 1
        this.timestamp = Date.now()
        this.products = []
    }

    load() {
        try {
            const savedCarr = JSON.parse(fs.readFileSync('./api/cart/cart.json', 'utf-8'))
            this.products = carrGuardar
        } catch {
            return
        }
        
    }

    add(product) {
        const newProduct = {...product}
        this.products.push(newProduct)
        this.loadCarr()
        return newProduct
    }

    list(id) {
        return this.products.find(prod => prod.id === Number(id))
    }

    delete(id) {
        if (this.products.length == 0) {
            return {error: "No hay productos cargados"}}
            const product = this.products.find(prod => prod.id === Number(id)) || {error: "Producto no encontrado"}
            this.products = this.products.filter(el => el.id !== Number(id))
            this.loadCarr()
            return product
    }

    loadCarr() {
        fs.writeFile('./api/cart/cart.json', JSON.stringify(this.products), (error) => {
            if (error) {
                throw new Error('Error...')
            } else {
                console.log('Carrito actualizado')
            }
        })
    }
}


module.exports = new Carrito;