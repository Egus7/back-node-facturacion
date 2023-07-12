const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const port = require('./port');
const app = express();

//prueba
const { clientMarket } = require('./database');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(cors());

//Hola mundo en el servidor de bienvenida 
app.get('/', (req, res) => {
    res.send('Hola mundo es una API Rest de mmarketdemo');
});

// obtener los datos de los usuarios
app.get('/minimarketdemoWeb/apirest/seguridades/usuarios', (req, res) => {

    clientMarket.query('SELECT * FROM seg_usuario ORDER BY id_seg_usuario')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// obtener los datos de un usuario
app.get('/minimarketdemoWeb/apirest/seguridades/usuarios/:id', (req, res) => {
    const { id } = req.params;

    clientMarket.query(`SELECT * FROM seg_usuario WHERE id_seg_usuario = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// para insertar un usuario
app.post('/minimarketdemoWeb/apirest/seguridades/usuarios', (req, res) => {
    const {codigo, apellidos, nombres, correo, clave, activo} = req.body;

    const query = `INSERT INTO seg_usuario (codigo, apellidos, nombres, correo, clave, activo) 
                    VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [codigo, apellidos, nombres, correo, clave, activo];
    
    clientMarket.query(query, values)
        .then(() => {
            res.status(201).send('Usuario agregado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al agregar usuario');
        });
});

// para actualizar un usuario
app.put('/minimarketdemoWeb/apirest/seguridades/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const {codigo, apellidos, nombres, correo, clave, activo} = req.body;

    const query = `UPDATE seg_usuario SET codigo = $1, apellidos = $2, nombres = $3, correo = $4, clave = $5, 
                                        activo = $6 WHERE id_seg_usuario = '${id}'`;
    const values = [codigo, apellidos, nombres, correo, clave, activo];
    
    clientMarket.query(query, values)
        .then(() => {
            res.status(201).send('Usuario actualizado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al actualizar usuario');
        });
});

// para eliminar un usuario
app.delete('/minimarketdemoWeb/apirest/seguridades/usuarios/:id', (req, res) => {
    const { id } = req.params;
    
    clientMarket.query(`DELETE FROM seg_usuario WHERE id_seg_usuario = '${id}'`)
        .then(() => {
            res.status(201).send('Usuario eliminado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al eliminar usuario');
        });
});

// Iniciar el servidor
app.listen(port.cnn, () => {
  console.log(`Servidor en ejecución en el puerto: http://localhost:${port.cnn}`);
});
