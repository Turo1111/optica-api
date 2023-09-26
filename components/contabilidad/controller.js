const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


async function getTotalMes(query) {
    try {

        let ventas = await store.getTotalMes(query)

        let ventasFaltantes = await agregarDatosFaltantes(ventas, query)

        return ventasFaltantes

    } catch (error) {
        return Promise.reject('Error al buscar ventas '+` ${error}`);
    }
}

async function getTotalAnual(query) {
  try {

      let ventas = await store.getTotalAnual(query)

      let ventasFaltantes = await agregarDatosFaltantes(ventas, query)

      return ventasFaltantes

  } catch (error) {
      return Promise.reject('Error al buscar ventas '+` ${error}`);
  }
}

async function getTotalSemana(query) {
  try {

    let ventas = await store.getTotalSemana(query)
    
    let ventasFaltantes = await agregarDatosFaltantes(ventas, query)
    
    return ventasFaltantes

  } catch (error) {
      return Promise.reject('Error al buscar ventas '+` ${error}`);
  }
}

function agregarDatosFaltantes(ventas, query) {
  // Obtener los nombres de las propiedades dinámicamente
  const nombresPropiedades = extraerNombresPropiedades(ventas);

  // Definir el arreglo de nombres de meses en español
  const monthsInSpanish = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const dayInSpanish = [
    'Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'
  ];

  // Crear un objeto para almacenar las ventas por mes
  const ventasAgregadas = {};
  let propsFaltantes = []
  if (query.tipoFecha === 'MENSUAL') {
    propsFaltantes = [...monthsInSpanish]
  }
  if (query.tipoFecha === 'ANUAL') {
    propsFaltantes = [...obtenerAnios()]
  }
  if (query.tipoFecha === 'SEMANAL') {
    propsFaltantes = [...dayInSpanish]
  }

  for (const dataKey of propsFaltantes) {
    ventasAgregadas[dataKey] = { _id: '', dataKey };
    for (const propiedad of nombresPropiedades) {
      ventasAgregadas[dataKey][propiedad] = 0;
    }
  }
  for (const venta of ventas) {
    const dataKey = venta.dataKey;
    if (!ventasAgregadas[dataKey]) {
      ventasAgregadas[dataKey] = { _id: '', dataKey };
      for (const propiedad of nombresPropiedades) {
        ventasAgregadas[dataKey][propiedad] = 0;
      }
    }
    ventasAgregadas[dataKey] = { ...ventasAgregadas[dataKey], ...venta };
    
  }
  let id = 1;
  for (const dataKey of propsFaltantes) {
    ventasAgregadas[dataKey]._id = id.toString();
    id++;
  }
  const resultado = Object.values(ventasAgregadas);
  return resultado;
}

// Función para extraer los nombres de propiedades dinámicamente
function extraerNombresPropiedades(ventas) {
  const nombresPropiedades = [];

  // Recorrer el primer objeto en el array
  ventas.forEach((itemVenta)=>{
    for (const key in itemVenta) {
      if (itemVenta.hasOwnProperty(key) && key !== "dataKey") {
        nombresPropiedades.push(key);
      }
    }
  })
  return nombresPropiedades;
}

function obtenerAnios() {
  const anioActual = new Date().getFullYear(); // Obtener el año actual
  const aniosAnteriores = [];
  const aniosPosteriores = [];

  // Generar los años anteriores (3 años)
  for (let i = 3; i >= 1; i--) {
    aniosAnteriores.push((anioActual - i).toString());
  }

  // Añadir el año actual
  aniosAnteriores.push(anioActual.toString());

  // Generar los años posteriores (3 años)
  for (let i = 1; i <= 3; i++) {
    aniosPosteriores.push((anioActual + i).toString());
  }

  // Combinar los años anteriores, el año actual y los años posteriores
  const aniosCombinados = [...aniosAnteriores, ...aniosPosteriores];

  return aniosCombinados;
}

module.exports = {
  getTotalMes,
  getTotalAnual,
  getTotalSemana
}