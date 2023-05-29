const store = require('./store');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function addProducto(producto, imagenFile) {
    if (!producto) {
        return Promise.reject('Invalid user list');
    } 

    let imagenPath = '';
    if (imagenFile) {
        // Guardar la imagen en el servidor
        imagenPath = saveImages(imagenFile);
    }

    const productoData = {
        ...producto,
        idCategoria: new mongoose.Types.ObjectId(producto.idCategoria),
        imagen: imagenPath,
    };

    return store.add(productoData);
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

function getProducto() {
    return store.get();
}


function patchProducto(idProducto, producto) {
    return store.patch(idProducto, producto);
}


module.exports = {
    addProducto,
    getProducto,
    patchProducto
}