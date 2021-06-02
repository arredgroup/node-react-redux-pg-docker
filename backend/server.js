'use strict';

const express = require('express');
const bodyParser = require('body-parser')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const postModel = require("./models/PostModel");

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.get('/', (req, res) => {
  res.send('Rest API - Posts by Chris Arredondo');
});

app.post('/api/post/create', (req, res) => {
  const { nombre, detalle } = req.body;
  if (!nombre || !detalle) {
    return res.status(500).send("No hay nombre o detalle");
  }
  postModel.insert(nombre, detalle)
    .then(id => {      
      return res.status(200).send("Post Insertado Correctamente");
    })
    .catch(err => {
      return res.status(500).send("Error insertando Post");
    });
});

app.delete('/api/post/delete/:id', (req, res) => {
  postModel.eliminar(req.params.id)
    .then(() => {
      return res.status(200).send("Post Eliminado Correctamente");
    })
    .catch(err => {
      return res.status(500).send("Error eliminando");
    });
});

app.get('/api/post/all', (req, res) => {
  postModel.getAll()
    .then(productos => {
      console.log(productos);
      return res.status(200).send(productos);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send("Error obteniendo posts");
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);