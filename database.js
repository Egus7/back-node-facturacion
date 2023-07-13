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

// Conexión a la base de datos
clientMarket.connect()
  .then(() => {
    console.log('Conexión exitosa a mmarketdemo');
  })
  .catch(err => {
    console.error('Error al conectar a mmarketdemo', err);
    clientMarket.end();
  });

  module.exports = {clientMarket};