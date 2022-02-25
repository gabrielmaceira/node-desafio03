const express = require("express")
const Contenedor = require("./classes/contenedor")

const app = express()
const PORT = 8080

const db = new Contenedor("./db/productos.txt")

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', async (req, res) => {
    try {
        const products = await db.getAll()
        res.send(products)
    }
    catch (err) {
        res.status(500).send('UPS! No se encontraron datos, intenta de nuevo mas tarde!');
        console.log("ENDPOINT /productos", err)
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
        const product = await db.getByRandomId()
        res.send(product)
    }
    catch (err) {
        res.status(500).send('UPS! No se encontraron datos, intenta de nuevo mas tarde!');
        console.log("ENDPOINT /productoRandom", err)
    }
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });