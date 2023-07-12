const { Client } = require('pg');
const fs = require('fs');


const clientMarket = new Client ({
    host: "servergrupo1.postgres.database.azure.com",
    user: "grupo1",
    password: "$erver2022",
    database: "mmarketdemo",
    port: 5432,
    ssl: {
        ca: fs.readFileSync("DigiCertGlobalRootCA.crt (1).pem")
    }
});

const clientFacturacion = new Client ({
    host: "servergrupo1.postgres.database.azure.com",
    user: "grupo1",
    password: "$erver2022",
    database: "facturacion",
    port: 5432,
    ssl: {
        ca: fs.readFileSync("DigiCertGlobalRootCA.crt (1).pem")
    }
});


// Conexión a la base de datos
clientMarket.connect()
  .then(() => {
    console.log('Conexión exitosa a mmarketdemo');
  })
  .catch(err => {
    console.error('Error al conectar a mmarketdemo', err);
    clientMarket.end();
  });

// Conexión a la base de datos
clientFacturacion.connect()
  .then(() => {
    console.log('Conexión exitosa a facturacion');
  })
  .catch(err => {
    console.error('Error al conectar a facturacion', err);
    clientFacturacion.end();
  });

  module.exports = { clientMarket, clientFacturacion };