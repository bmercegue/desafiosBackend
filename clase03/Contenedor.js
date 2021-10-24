const fs = require('fs')

class Contenedor {
    constructor (productos) {
        this.ruta = productos
    }

    getAll = async () => {
        try {
            const stock = await fs.promises.readFile(this.ruta, 'utf-8')
            
            return JSON.parse(stock);

        } catch (error) {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 1))
            const stock = await fs.promises.readFile(this.ruta, 'utf-8')
            
            return JSON.parse(stock);
        }
    }

    saveProducto = async producto => {
        const arrProductos = await this.getAll()

        arrProductos.push(producto);

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrProductos, null, 4))
            return producto.id
        } catch (error) {
            throw new Error('No se guardó el producto')
        }
    }

    getById = async id => {
        const arrProductos = await this.getAll()
        const productoBuscado = arrProductos.find( p => p.id === id);

        return productoBuscado;

    }

    getRandom = async () => {
        const arrProductos = await this.getAll();
        let maxId = 0;
        let prodRandom;
        arrProductos.forEach(valor => {
            if (valor.id > maxId) {
                maxId = valor.id; }
            }
        );
        prodRandom = parseInt(Math.random() * maxId) + 1
        try {
            const arrProductos = await this.getAll();
            let salida = arrProductos.find (obj => (obj.id===prodRandom))
            if (salida) {
                return salida
            } else {
                return null
                }
        } catch {
            throw new Error('No se pudo obtener producto random');
        }
    }


    deleteById = async id => {
        const arrProductos = await this.getAll()
        const productoBorrado = arrProductos.filter(p => p.id !== id)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(productoBorrado, null, 1))
        } catch (error) {
            throw new Error('No se pudo actualizar', error)
        }
    }

    deleteAll = async () => {
        return await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }

}

module.exports = Contenedor;