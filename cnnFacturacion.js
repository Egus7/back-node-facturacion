const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const port = require('./port');
const app = express();
 
//prueba
const { clientFacturacion } = require('./database');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(cors());


// obtener los datos de los productos
app.get('/facturacionWeb/apirest/productos', (req, res) => {

    clientFacturacion.query('SELECT * FROM producto ORDER BY codigo_producto')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// obtener los datos de un producto
app.get('/facturacionWeb/apirest/productos/:id', (req, res) => {
    const { id } = req.params;

    clientFacturacion.query(`SELECT * FROM producto WHERE codigo_producto = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// para insertar un usuario
app.post('/facturacionWeb/apirest/productos', (req, res) => {
    const {codigo_producto, nombre, descripcion, precio_unitario, existencia, tiene_impuesto} = req.body;

    const query = `INSERT INTO producto (codigo_producto, nombre, descripcion, precio_unitario, existencia, tiene_impuesto) 
                    VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [codigo_producto, nombre, descripcion, precio_unitario, existencia, tiene_impuesto];
    
    clientFacturacion.query(query, values)
        .then(() => {
            res.status(201).send('Producto gregado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al agregar producto');
        });
});

// para actualizar un producto
app.put('/facturacionWeb/apirest/productos/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, descripcion, precio_unitario, existencia, tiene_impuesto} = req.body;

    const query = `UPDATE producto SET nombre = $1, descripcion = $2, precio_unitario = $3, 
                    existencia = $4, tiene_impuesto = $5 WHERE codigo_producto = '${id}'`;
    const values = [nombre, descripcion, precio_unitario, existencia, tiene_impuesto];
    
    clientFacturacion.query(query, values)
        .then(() => {
            res.status(201).send('Producto actualizado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al actualizar producto');
        });
});

// para eliminar un producto
app.delete('/facturacionWeb/apirest/productos/:id', (req, res) => {
    const { id } = req.params;
    
    clientFacturacion.query(`DELETE FROM producto WHERE codigo_producto = '${id}'`)
        .then(() => {
            res.status(201).send('Producto eliminado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al eliminar producto');
        });
});

// Iniciar el servidor
app.listen(port.cnnFacturacion, () => {
    console.log(`Servidor en ejecución en el puerto: http://localhost:${port.cnnFacturacion}`);
  });