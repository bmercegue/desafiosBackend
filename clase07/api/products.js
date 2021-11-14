const fs = require('fs')

class Products {

    constructor () {
        this.products =  []
    }

    get list() {
        return this.products
    }

    load() {
        try {
            const savedProds = JSON.parse(fs.readFileSync('./api/stock/stock.json', 'utf-8'))
            this.products = savedProds
        } catch {
            return
        }
    }
    agregar(product) {
        const newProduct= {
            id: this.product.length + 1,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock,
            cod: product.cod,
            desc: product.desc,
            timestamp: Date.now()
        }
        this.products.push(newProduct)
        this.persistStock()
        return newProduct
    }

    listarId(id) {
        return this.products.find(prod => prod.id === Number(id))
    }

    borrar(id) {
        if (this.products.length == 0) { return {error: "No hay items cargados."}}
        const product = this.products.find(prod => prod.id === Number(id)) || {error: "Producto no encontrado"}
        this.products = this.products.filter(el => el.id !== Number(id))
        this.loadStock()
        return product
    }

    actualizar(prod, id) {
        if (this.products.length == 0) { return {error: "No hay items cargados."}}
        const {title, price, thumbnail, stock, cod, desc} = prod
        const product = this.products.find(prod => prod.id === Number(id))
        if (product) {
            product.title = title
            product.price = price
            product.thumbnail = thumbnail
            product.sotck = stock
            product.cod = cod
            product.desc = desc

            this.loadStock()
            return product
        } else {
            return {error: "Producto no encontrado"}
        }
    }

    loadStock() {
        fs.writeFile('./api/stock/stock.json', JSON.stringify(this.products), (error)=>{
            if (error) {
                throw new Error('Error de escritura')
            } else {
                console.log('Stock actualizado')
            }
        })
    }
}


module.exports = new Products();