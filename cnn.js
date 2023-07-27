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

//Hola mundo en el servidor de bienvenida 
app.get('/', (req, res) => {
    res.send('Hola mundo,  esta es una API Rest de facturacion');
});

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
    const {nombre, descripcion, precio_unitario, tiene_impuesto} = req.body;

    const query = `UPDATE producto SET nombre = $1, descripcion = $2, precio_unitario = $3, 
                    tiene_impuesto = $4 WHERE codigo_producto = '${id}'`;
    const values = [nombre, descripcion, precio_unitario, tiene_impuesto];
    
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

// Obtener los datos de los clientes    
app.get('/facturacionWeb/apirest/clientes', (req, res) => {
    clientFacturacion.query('SELECT * FROM cliente ORDER BY apellidos, nombres')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de un cliente
app.get('/facturacionWeb/apirest/clientes/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM cliente WHERE cedula_cliente = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Insertar un cliente
app.post('/facturacionWeb/apirest/clientes', (req, res) => {
    const { cedula_cliente, nombres, apellidos, direccion, clave } = req.body;
    const query = `INSERT INTO cliente (cedula_cliente, nombres, apellidos, direccion, clave) 
                    VALUES ($1, $2, $3, $4, $5)`;
    const values = [cedula_cliente, nombres, apellidos, direccion, clave];
    clientFacturacion.query(query, values)
        .then(() => {
            res.status(201).send('Cliente agregado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al agregar cliente');
        });
});

// Actualizar un cliente
app.put('/facturacionWeb/apirest/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, direccion, clave } = req.body;
    const query = `UPDATE cliente SET nombres = $1, apellidos = $2, direccion = $3, clave = $4 
                    WHERE cedula_cliente = '${id}'`;
    const values = [nombres, apellidos, direccion, clave];
    clientFacturacion.query(query, values)
        .then(() => {
            res.status(200).send('Cliente actualizado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al actualizar cliente');
        });
});

// Eliminar un cliente
app.delete('/facturacionWeb/apirest/clientes/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`DELETE FROM cliente WHERE cedula_cliente = '${id}'`)
        .then(() => {
            res.status(200).send('Cliente eliminado');
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error al eliminar cliente');
        });
});

// Obtener los datos de los estados de pedido
app.get('/facturacionWeb/apirest/estado-pedido', (req, res) => {
    clientFacturacion.query('SELECT * FROM estado_pedido ORDER BY id_estado_pedido')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de un estado de pedido
app.get('/facturacionWeb/apirest/estado-pedido/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM estado_pedido WHERE id_estado_pedido = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los parámetros
app.get('/facturacionWeb/apirest/parametros', (req, res) => {
    clientFacturacion.query('SELECT * FROM parametro ORDER BY nombre_parametro')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de un parámetro
app.get('/facturacionWeb/apirest/parametros/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM parametro WHERE nombre_parametro = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los pedidos
app.get('/facturacionWeb/apirest/pedidos', (req, res) => {
    clientFacturacion.query('SELECT * FROM pedido_cab ORDER BY numero_pedido')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de un pedido
app.get('/facturacionWeb/apirest/pedidos/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM pedido_cab WHERE numero_pedido = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los detalles de pedidos
app.get('/facturacionWeb/apirest/pedidos-detalles', (req, res) => {
    clientFacturacion.query('SELECT * FROM pedido_det ORDER BY numero_pedido_det')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los detalles de un pedidodet
app.get('/facturacionWeb/apirest/pedidos-detalles/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM pedido_det WHERE numero_pedido_det = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los detalles de un pedidocab en especifico
app.get('/facturacionWeb/apirest/pedidoscab-detalles/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM pedido_det WHERE numero_pedido = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Registrar pedido
app.post('/facturacionWeb/apirest/registrarpedido', (req, res) => {
    const { fecha_pedido, cedula_cliente, id_estado_pedido, subtotal, detalles } = req.body;

    const queryCabecera = `INSERT INTO pedido_cab (fecha_pedido, cedula_cliente, id_estado_pedido, subtotal) 
                           VALUES ($1, $2, $3, $4) RETURNING numero_pedido`;
    const valuesCabecera = [fecha_pedido, cedula_cliente, id_estado_pedido, subtotal];

    clientFacturacion.query(queryCabecera, valuesCabecera)
        .then(response => {
            const numeroPedido = response.rows[0].numero_pedido;

            const insertDetallePromises = detalles.map(detalle => {
                const { numero_pedido_det, codigo_producto, cantidad, precio_unitario_venta } = detalle;
                const queryDetalle = `INSERT INTO pedido_det (numero_pedido, codigo_producto, cantidad, precio_unitario_venta)
                                       VALUES ($1, $2, $3, $4)`;
                const valuesDetalle = [numeroPedido, codigo_producto, cantidad, precio_unitario_venta];
                return clientFacturacion.query(queryDetalle, valuesDetalle);
            });

            return Promise.all(insertDetallePromises);
        })
        .then(() => {
            // Si todo salió bien, hacemos commit
            clientFacturacion.query('COMMIT');
            // actualizamos el stock
            const updateStockPromises = detalles.map(detalle => {
                const { codigo_producto, cantidad } = detalle;
                const queryStock = `UPDATE producto SET existencia = existencia + $1 WHERE codigo_producto = $2`;
                const valuesStock = [cantidad, codigo_producto];
                return clientFacturacion.query(queryStock, valuesStock);
            });

            return Promise.all(updateStockPromises);
        })
        .then(() => {
            res.status(201).json({ message: 'Pedido registrado correctamente' });
        })
        .catch(err => {
            clientFacturacion.query('ROLLBACK');
            console.error(err);
            res.status(400).json({ message: 'Error al registrar el pedido' });
        });
});



// Obtener los datos de las facturas
app.get('/facturacionWeb/apirest/facturas', (req, res) => {
    clientFacturacion.query('SELECT * FROM factura_cab ORDER BY fecha_emision DESC')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de una factura
app.get('/facturacionWeb/apirest/facturas/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM factura_cab WHERE numero_factura = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los detalles de facturas
app.get('/facturacionWeb/apirest/facturas-detalles', (req, res) => {
    clientFacturacion.query('SELECT * FROM factura_det ORDER BY numero_factura_det')
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los detalles de una facturadet
app.get('/facturacionWeb/apirest/facturas-detalles/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM factura_det WHERE numero_factura_det = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

// Obtener los datos de los detalles de una facturacab en especifico
app.get('/facturacionWeb/apirest/facturacab-detalles/:id', (req, res) => {
    const { id } = req.params;
    clientFacturacion.query(`SELECT * FROM factura_det WHERE numero_factura = '${id}'`)
        .then(response => {
            res.json(response.rows);
        })
        .catch(err => {
            console.log(err);
        });
});


// Método para obtener el producto completo desde la base de datos
function ObtenerProductoCompleto(codigoProducto) {
    const queryProducto = 'SELECT * FROM producto WHERE codigo_producto = $1';
    const valuesProducto = [codigoProducto];

    return clientFacturacion.query(queryProducto, valuesProducto)
        .then(response => {
            // Suponiendo que response.rows[0] contiene la información completa del producto
            return response.rows[0];
        })
        .catch(err => {
            console.error(err);
            throw new Error('Error al obtener la información del producto');
        });
}

//registrar una factura
app.post('/facturacionWeb/apirest/registrarfactura', async (req, res) => {
    const { cedula_cliente, fecha_emision, estado, detalles } = req.body;

    // Calcular subtotal, base cero y valor del IVA
    let subtotal = 0;
    let baseCero = 0;
    let valorIVA = 0;

    try {
        // Calcular subtotal, base cero y valor del IVA
        for (const detalle of detalles) {
            // Obtener la información del producto desde la tabla producto
            const producto = await ObtenerProductoCompleto(detalle.codigo_producto);

            if (producto.tiene_impuesto === 'S') {
                // Si el producto tiene IVA, se suma al valor del IVA
                valorIVA += ((detalle.cantidad * detalle.precio_unitario_venta) * 0.12);
            } else {
                // Sino, se suma a la base cero
                baseCero += ((detalle.cantidad * detalle.precio_unitario_venta) * 0);
            }

            // Calcular subtotal
            subtotal += detalle.cantidad * detalle.precio_unitario_venta;
        }

        // Calcular el total
        let total = subtotal + valorIVA;

        // Iniciar una transacción para el registro de la factura
        await clientFacturacion.query('BEGIN');

        // Insertar la cabecera de la factura
        const queryCabecera = `INSERT INTO factura_cab (cedula_cliente, fecha_emision, subtotal, 
                                                        base_cero, valor_iva, total, estado) 
                               VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING numero_factura`;
        const valuesCabecera = [cedula_cliente, fecha_emision, subtotal, baseCero, valorIVA, total, estado];

        const response = await clientFacturacion.query(queryCabecera, valuesCabecera);
        const numeroFactura = response.rows[0].numero_factura;

        // Insertar los detalles de la factura
        const insertDetallePromises = detalles.map(detalle => {
            const { codigo_producto, cantidad, precio_unitario_venta } = detalle;
            const queryDetalle = `INSERT INTO factura_det (numero_factura, codigo_producto, cantidad, 
                                                            precio_unitario_venta)
                                   VALUES ($1, $2, $3, $4)`;
            const valuesDetalle = [numeroFactura, codigo_producto, cantidad, precio_unitario_venta];
            return clientFacturacion.query(queryDetalle, valuesDetalle);
        });

        await Promise.all(insertDetallePromises);

        // Si todo salió bien, hacemos commit
        await clientFacturacion.query('COMMIT');

        // actualizamos el stock
        const updateStockPromises = detalles.map(detalle => {
            const { codigo_producto, cantidad } = detalle;
            const queryStock = `UPDATE producto SET existencia = existencia - $1 WHERE codigo_producto = $2`;
            const valuesStock = [cantidad, codigo_producto];
            return clientFacturacion.query(queryStock, valuesStock);
        });

        await Promise.all(updateStockPromises);
    
        res.status(201).json({ message: 'Factura registrada correctamente' });
    } catch (error) {
        // Si ocurrió algún error, hacemos rollback
        await clientFacturacion.query('ROLLBACK');
        console.error(error);
        res.status(400).json({ message: 'Error al registrar la factura' });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto: http://localhost:${port}`);
  });