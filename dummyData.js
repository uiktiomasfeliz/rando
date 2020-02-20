const Truck = require('./models/truck');

exports.dummyData = () => {
    
  Truck.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    
    const data = [
      new Truck({
        id: 1,
        title: 'Camión de basura 1',
        description: 'Normalmente usado por la noche',
        status: 0
      }),
      new Truck({ 
        id: 2,
        title: 'Barredora 1',
        description: 'Usada en Málaga',
        status: 1
      }),
      new Truck({
        id: 3,
        title: 'Camión de basura 2',
        description: 'Normalmenta usado por de dia',
        status: 0
      }),
      new Truck({
        id: 4,
        title: 'Camion de Basura 3',
        description: 'Camión de sustitución',
        status: 2
      })
    ];

    Truck.create(data, (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
