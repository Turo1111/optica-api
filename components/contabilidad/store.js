const Venta = require('../venta/model');
const CierreCaja = require('../cierrecaja/model');

const monthsInSpanish = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const dayInSpanish = [
  'Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'
];


let pipeLineSucursal = [
  {
    $lookup: {
      from: "sucursals",
      localField: "idSucursal",
      foreignField: "_id",
      as: "sucursal",
    },
  },
  {
    $unwind: {
      path: "$sucursal",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: "$dataKey",
      ventas: {
        $push: {
          _id: "$_id",
          sucursal: "$sucursal.descripcion",
          total: "$total"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      ventas: 1
    }
  },
  {
    $sort: { dataKey: 1 }
  },
  {
    $unwind: "$ventas" // Deshacer el arreglo de ventas
  }, 
  {
    $group: {
      _id: {
        dataKey: "$dataKey",
        sucursal: "$ventas.sucursal"
      },
      totalVentas: { $sum: "$ventas.total" } // Sumar el total de ventas por mes y sucursal
    }
  },
  {
    $group: {
      _id: "$_id.dataKey",
      sucursales: {
        $push: {
          sucursal: "$_id.sucursal",
          total: "$totalVentas"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      sucursales: 1
    }
  },
  {
    $sort: { dataKey: 1 }
  },
  {
    $unwind: "$sucursales"
  },
  {
    $group: {
      _id: {
        dataKey: "$dataKey",
        sucursal: "$sucursales.sucursal"
      },
      total: { $sum: "$sucursales.total" }
    }
  },
  {
    $group: {
      _id: "$_id.dataKey",
      sucursales: {
        $push: {
          k: "$_id.sucursal",
          v: "$total"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      sucursales: {
        $arrayToObject: "$sucursales"
      }
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            dataKey: "$dataKey"
          },
          "$sucursales"
        ]
      }
    }
  }
]

let pipeLineTipoPago = [
  {
    $group: {
      _id: "$dataKey",
      ventas: {
        $push: {
          _id: "$_id",
          tipoPago: "$tipoPago.descripcion",
          total: "$total"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      ventas: 1
    }
  },
  {
    $sort: { dataKey: 1 }
  },
  {
    $unwind: "$ventas" // Deshacer el arreglo de ventas
  },
  {
    $group: {
      _id: {
        dataKey: "$dataKey",
        tipoPago: "$ventas.tipoPago"
      },
      totalVentas: { $sum: "$ventas.total" } // Sumar el total de ventas por mes y sucursal
    }
  },
  {
    $group: {
      _id: "$_id.dataKey",
      tipoPago: {
        $push: {
          tipoPago: "$_id.tipoPago",
          total: "$totalVentas"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      tipoPago: 1
    }
  },
  {
    $sort: { dataKey: 1 }
  },
  //
  {
    $unwind: "$tipoPago"
  },
  {
    $group: {
      _id: {
        dataKey: "$dataKey",
        tipoPago: "$tipoPago.tipoPago"
      },
      total: { $sum: "$tipoPago.total" }
    }
  },
  {
    $group: {
      _id: "$_id.dataKey",
      tipoPago: {
        $push: {
          k: "$_id.tipoPago",
          v: "$total"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      tipoPago: {
        $arrayToObject: "$tipoPago"
      }
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            dataKey: "$dataKey"
          },
          "$tipoPago"
        ]
      }
    }
  }
]

let pipeLineTotal = [
  {
    $group: {
      _id: {
        $dateToString: {
          format: '%Y-%m',
          date: '$fecha', // Agrupar por mes y año
        },
      },
      dataKey: { $first: '$dataKey' }, // El nombre del mes
      total: { $sum: '$total' }, // Sumar el campo 'total' para obtener el total de ventas por mes
    },
  },
  {
    $project: {
      _id: 1, // Excluir el campo "_id" del resultado
      dataKey: 1, // Renombrar "_id" como "mes"
      total: 1, // Incluir el campo "total" en el resultado
    },
  },
  {
    $sort: { dataKey: 1 }, // Ordenar por mes en orden ascendente
  }
]

let pipeLineOS = [
  {
    $match: {
      idOrden: { $ne: null } // Filtrar ventas con idOrden no nulo
    },
  },
  {
    $lookup: {
      from: "ordens",
      localField: "idOrden",
      foreignField: "_id",
      as: "orden",
    },
  },
  {
    $unwind: {
      path: "$orden",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "obrasocials",
      localField: "orden.idObraSocial",
      foreignField: "_id",
      as: "obraSocial",
    },
  },
  {
    $unwind: {
      path: "$obraSocial",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: "$dataKey",
      ventas: {
        $push: {
          _id: "$_id",
          obraSocial: "$obraSocial.descripcion",
          total: "$total"
        }
      }
    }
  }, 
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      ventas: 1
    }
  },
  {
    $sort: { dataKey: 1 }
  },
  {
    $unwind: "$ventas" // Deshacer el arreglo de ventas
  },
  
  {
    $group: {
      _id: {
        dataKey: "$dataKey",
        obraSocial: "$ventas.obraSocial"
      },
      totalVentas: { $sum: "$ventas.total" } // Sumar el total de ventas por mes y sucursal
    }
  },
  {
    $group: {
      _id: "$_id.dataKey",
      obraSocial: {
        $push: {
          obraSocial: "$_id.obraSocial",
          total: "$totalVentas"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      obraSocial: 1
    }
  },
  {
    $sort: { dataKey: 1 }
  } ,
  //
  {
    $unwind: "$obraSocial"
  },
  {
    $group: {
      _id: {
        dataKey: "$dataKey",
        obraSocial: "$obraSocial.obraSocial"
      },
      total: { $sum: "$obraSocial.total" }
    }
  },
  {
    $group: {
      _id: "$_id.dataKey",
      obraSocial: {
        $push: {
          k: "$_id.obraSocial",
          v: "$total"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      dataKey: "$_id",
      obraSocial: {
        $arrayToObject: "$obraSocial"
      }
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            dataKey: "$dataKey"
          },
          "$obraSocial"
        ]
      }
    }
  }
]

function getTotalMes(query) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(currentYear, 0, 1); // 1 de enero del año actual
  const endDate = new Date(currentYear, 11, 31); // 31 de diciembre del año actual

  let pipeLine = []

  if (query.tipoDato === 'TOTAL_SUC') {
    pipeLine = [...pipeLineSucursal]
  }
  if (query.tipoDato === 'TOTAL_DI_COMPRA') {
    pipeLine = [...pipeLineTotal]
  }
  if (query.tipoDato === 'TOTAL_TP') {
    pipeLine = [...pipeLineTipoPago]
  }
  if (query.tipoDato === 'TOTAL_OS') {
    pipeLine = [...pipeLineOS]
  }

  return Venta.aggregate([
    {
      $match: {
        fecha: {
          $gte: startDate, // Fecha de inicio del año actual
          $lte: endDate,   // Fecha de fin del año actual
        },
      },
    },
    {
      $addFields: {
        dataKey: {
          $let: {
            vars: {
              monthNames: monthsInSpanish
            },
            in: {
              $arrayElemAt: ['$$monthNames', { $subtract: [{ $month: '$fecha' }, 1] }]
            }
          }
        }
      }
    },
    ...pipeLine
  ]).exec()
}

function getTotalAnual(query) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(currentYear-3, 0, 1); // 1 de enero del año actual
  const endDate = new Date(currentYear+3, 11, 31); // 31 de diciembre del año actual

  console.log('fechas', startDate, endDate)

  let pipeLine = []

  if (query.tipoDato === 'TOTAL_SUC') {
    pipeLine = [...pipeLineSucursal]
  }
  if (query.tipoDato === 'TOTAL_DI_COMPRA') {
    pipeLine = [...pipeLineTotal]
  }
  if (query.tipoDato === 'TOTAL_TP') {
    pipeLine = [...pipeLineTipoPago]
  }
  if (query.tipoDato === 'TOTAL_OS') {
    pipeLine = [...pipeLineOS]
  } 

  return Venta.aggregate([
    {
      $match: {
        fecha: {
          $gte: startDate, // Fecha de inicio del año actual
          $lte: endDate,   // Fecha de fin del año actual
        },
      },
    },
    {
      $addFields: {
        dataKey: {$year: '$fecha'}
        
      }
    },
    ...pipeLine
    
  ]).exec()
}

function getTotalSemana(query) {
  const currentDate = new Date();

  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
  const lastDayOfWeek = firstDayOfWeek + 6;
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDayOfWeek);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDayOfWeek);

  console.log('fechas', startDate, endDate)

  let pipeLine = []

  if (query.tipoDato === 'TOTAL_SUC') {
    pipeLine = [...pipeLineSucursal]
  }
  if (query.tipoDato === 'TOTAL_DI_COMPRA') {
    pipeLine = [...pipeLineTotal]
  }
  if (query.tipoDato === 'TOTAL_TP') {
    pipeLine = [...pipeLineTipoPago]
  }
  if (query.tipoDato === 'TOTAL_OS') {
    pipeLine = [...pipeLineOS]
  } 

  return Venta.aggregate([
    {
      $match: {
        fecha: {
          $gte: startDate, // Fecha de inicio del año actual
          $lte: endDate,   // Fecha de fin del año actual
        },
      },
    },
    {
      $addFields: {
        dataKey: {
          $let: {
            vars: {
              dayNames: dayInSpanish
            },
            in: {
              $arrayElemAt: ['$$dayNames', { $subtract: [{ $dayOfWeek: '$fecha' }, 1] }]
            }
          }
        }
      }
    },
    ...pipeLine
  ]).exec()
}

module.exports = {
  getTotalMes,
  getTotalAnual,
  getTotalSemana
}
