const store = require('./store');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageDir = path.join(__dirname, '..','..', 'public')

function addProducto(producto, imagenFile) {
    if (!producto) {
        return Promise.reject('Invalid user list');
    } 

    console.log("Imagen file",imagenFile)

    let imagenPath = '';

    if (imagenFile) {
        // Guardar la imagen en el servidor
        imagenPath = saveImages(imagenFile);
        console.log("Imagen path",imagenPath)
    }

    const productoData = {
        ...producto,
        idCategoria: new mongoose.Types.ObjectId(producto.idCategoria),
        imagen: imagenPath,
    };

    if (producto.idMarca !== '') {
      productoData.idMarca = new mongoose.Types.ObjectId(producto.idMarca);
    }else{
        delete productoData.idMarca
    }
    
    if (producto.idColor !== '') {
      productoData.idColor = new mongoose.Types.ObjectId(producto.idColor);
    }else{
        delete productoData.idColor
    }
    
    return store.add(productoData);
}

function getProducto() {
    return store.get();
}

function findExist(codigo) {
    if (!codigo) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(codigo);
}


function patchProducto(idProducto, producto, imagenFile) {

    if (producto.imagen) {
        deleteImage(producto.imagen)
    }

    console.log("Imagen file",imagenFile)

    let imagenPath = '';

    if (imagenFile) {
        // Guardar la imagen en el servidor
        imagenPath = saveImages(imagenFile);
        console.log("Imagen path",imagenPath)
    }

    const productoData = {
        ...producto,
        imagen: imagenPath,
    };

    if (producto.categoria) {
        if ( isObjectId(producto.categoria)) {
            productoData.idCategoria = new mongoose.Types.ObjectId(producto.categoria);
        }
    }

    if (producto.marca) {
        if ( isObjectId(producto.marca)) {
            productoData.idMarca = new mongoose.Types.ObjectId(producto.marca);
        }
    }
      
    if (producto.color) {
        if (isObjectId(producto.color)) {
            productoData.idColor = new mongoose.Types.ObjectId(producto.color);
        }
    }

    return store.patch(idProducto, productoData);
}

function saveImages(file){
    const tempPath = file.path;
    const targetDir = path.join(__dirname, '..','..', 'public', 'images');
    const targetPath = path.join(targetDir, file.originalname);

    // Crear la carpeta de destino si no existe
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    sharp(tempPath)
    .rotate()
    .jpeg({ quality: 20 }) // Comprime la imagen en formato JPEG con calidad del 80%
    .toFile(targetPath, (err) => {
        if (err) {
            console.error('Error al comprimir la imagen:', err);
            return;
        }

        fs.unlinkSync(tempPath);
    });

    // Devolver el path de la imagen guardada
    return '/images/' + file.originalname;
}

function isObjectId(variable) {
    return mongoose.Types.ObjectId.isValid(variable);
}

function deleteImage(filename) {
    const imagePath = path.join(imageDir, filename);
  
    // Verificar si el archivo existe
    if (fs.existsSync(imagePath)) {
      // Eliminar el archivo
      fs.unlinkSync(imagePath);
      console.log('Imagen eliminada:', filename);
    } else {
      console.log('La imagen no existe:', filename);
    }
  }

module.exports = {
    addProducto,
    getProducto,
    patchProducto,
    findExist
}