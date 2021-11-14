const fs = require('fs')

class Contenedor {
    constructor (content) {
        this.content = content;
    }

    getAll = async () => {
        try {
            const stock = await fs.promises.readFile(this.content, 'utf-8')            
            return JSON.parse(stock);
        } catch (error) {
            console.log('error...')
            await fs.promises.writeFile(this.content, JSON.stringify([], null, 2))
            const stock = await fs.promises.readFile(this.content, 'utf-8')          
            return JSON.parse(stock)
        }
    }

    save = async (object) => {
        const arrObjects = await this.getAll();
        let showId = 0;
        arrObjects.forEach(valor => {
            if (valor.id > showId) {
                showId = valor.id;
            }
        });
        showId+=1;

        const obj = ({sender:object.sender, dateHour:object.dateHour, text:object.text, id: showId})
        arrObjects.push(obj)
        try {
            await fs.promises.writeFile(this.content, JSON.stringify(arrObjects, null, 3))
            return obj.id;
        } catch {
            throw new Error('No se ha guardado el objeto');
        }
    }

    getById = async (id) => {
        try {         
            const arrObjects = await this.getAll();
            let salida = arrObjects.find(obj => (obj.id===id))
            if (salida) {
                return salida
            } else {
                return null
            } 
        }catch {
            throw new Error ('Error de id');
        }
    }       

    showRandom = async () => {
        const arrObjects = await this.getAll();
        let showId = 0;
        let showRandom;
        arrObjects.forEach(valor => {
            if (valor.id > showId) {
                showId = valor.id; 
            }
        });

        showRandom = parseInt(Math.random() * showId) + 1
        try {
            const arrObjects = await this.getAll();
            let salida = arrObjects.find (obj => (obj.id===showRandom))
            if (salida) {
                return salida
            } else {
                return null
                }
        } catch {
            throw new Error('No se pudo obtener objeto random');
        }
    }


    deleteById = async (id) => {
        try { 
            const arrObjects = await this.getAll();
            for (let i=0; i< arrObjects.length; i++)
            {
                if(id===arrObjects[i].id) {
                    arrObjects.splice(i, 1)
                }
            }
            await fs.promises.writeFile(this.content, JSON.stringify(arrObjects, null, 3))
        } catch (error) {
            throw new Error('No se pudo actualizar');
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.content, JSON.stringify([], null, 3))
        }catch (error) {
        throw new Error('No se pudo borrar el objeto');
        }
    }
}

module.exports = Contenedor;