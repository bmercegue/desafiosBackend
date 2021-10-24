
class Usuario {
    constructor(nombre, apellido, libros, mascotas = []) { 
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    
    getFullName () { 
        return `${this.nombre} + ${this.apellido}`;
    }

    addMascota (agregarMascota) {
        this.mascotas.push(agregarMascota);
    }

    addBook (agregarLibro) {
        this.libros.push(agregarLibro); 
    }

    getBookNames () {
        return this.libros.map(elemento => elemento.nombre);
    }
    
    countMascotas () {
        return this.mascotas.length;
    }
}


const miUsuario = new Usuario('Pedro', 'Martinez', [])
//console.log(`${miUsuario.nombre} ${miUsuario.apellido}`);

miUsuario.addMascota({
    color: 'cafe',
    mascota: 'perro'
})
miUsuario.addMascota({
    color: 'negro',
    mascota: 'gato'
})

//console.log(miUsuario.mascotas);

miUsuario.addBook({
    nombre: '1984',
    autor: 'George Orwell'
})
miUsuario.addBook({
    nombre: 'Orgullo y Prejucio',
    autor: 'Jane Austen'
})
miUsuario.addBook({
    nombre: 'Cartas a Milena',
    autor: 'Franz Kafka'
})

//console.log(miUsuario.libros);
//console.log(miUsuario.getBookNames());
//console.log(miUsuario.countMascotas());