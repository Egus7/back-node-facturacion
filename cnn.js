const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
const fs = require('fs');

//prueba
const { Client } = require('pg');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(cors());

const connectionString = {
    host: "servergrupo1.postgres.database.azure.com",
    user: "grupo1",
    password: "$erver2022",
    database: "mmarketdemo",
    port: 5432,
    ssl: {
        ca: fs.readFileSync("DigiCertGlobalRootCA.crt (1).pem")
    }
};
//Hola mundo en el servidor de bienvenida 
app.get('/', (req, res) => {
    res.send('Hola mundo es una API Rest de mmarketdemo');
});

// obtener los datos de los usuarios
app.get('/minimarketdemoWeb/apirest/seguridades/usuarios', (req, res) => {

    const client = new Client((connectionString));

    client.connect();

    client.query('SELECT * FROM seg_usuario ORDER BY id_seg_usuario')
        .then(response => {
            res.json(response.rows);
            client.end();
        })
        .catch(err => {
            console.log(err);
            client.end();
        });
});

// obtener los datos de un usuario
app.get('/minimarketdemoWeb/apirest/seguridades/usuarios/:id', (req, res) => {
    const { id } = req.params;


    const client = new Client((connectionString));

    client.connect();

    client.query(`SELECT * FROM seg_usuario WHERE id_seg_usuario = '${id}'`)
        .then(response => {
            res.json(response.rows);
            client.end();
        })
        .catch(err => {
            console.log(err);
            client.end();
        });
});

// para insertar un usuario
app.post('/minimarketdemoWeb/apirest/seguridades/usuarios', (req, res) => {
    const {codigo, apellidos, nombres, correo, clave, activo} = req.body;

    const client = new Client(connectionString);

    client.connect();

    const query = `INSERT INTO seg_usuario (codigo, apellidos, nombres, correo, clave, activo) 
                    VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [codigo, apellidos, nombres, correo, clave, activo];
    
    client.query(query, values)
        .then(() => {
            res.status(201).send('Usuario agregado');
            client.end();
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al agregar usuario');
            client.end();
        });
});

// para actualizar un usuario
app.put('/minimarketdemoWeb/apirest/seguridades/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const {codigo, apellidos, nombres, correo, clave, activo} = req.body;

    const client = new Client(connectionString);

    client.connect();

    const query = `UPDATE seg_usuario SET codigo = $1, apellidos = $2, nombres = $3, correo = $4, clave = $5, 
                                        activo = $6 WHERE id_seg_usuario = '${id}'`;
    const values = [codigo, apellidos, nombres, correo, clave, activo];
    
    client.query(query, values)
        .then(() => {
            res.status(201).send('Usuario actualizado');
            client.end();
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al actualizar usuario');
            client.end();
        });
});

// para eliminar un usuario
app.delete('/minimarketdemoWeb/apirest/seguridades/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const client = new Client(connectionString);

    client.connect();
    
    client.query(`DELETE FROM seg_usuario WHERE id_seg_usuario = '${id}'`)
        .then(() => {
            res.status(201).send('Usuario eliminado');
            client.end();
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al eliminar usuario');
            client.end();
        });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto: http://localhost:${port}`);
});
