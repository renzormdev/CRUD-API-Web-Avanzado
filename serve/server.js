const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vuelo_dbase'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// CRUD para destinos
app.get('/destinos', (req, res) => {
  const sql = 'SELECT * FROM destinos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/destinos', (req, res) => {
  const sql = 'INSERT INTO destinos SET ?';
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/destinos/:id', (req, res) => {
  const sql = `UPDATE destinos SET ? WHERE id_destino = ${req.params.id}`;
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/destinos/:id', (req, res) => {
  const sql = `DELETE FROM destinos WHERE id_destino = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CRUD para empresas
app.get('/empresas', (req, res) => {
  const sql = 'SELECT * FROM empresas';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/empresas', (req, res) => {
  const sql = 'INSERT INTO empresas SET ?';
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/empresas/:id', (req, res) => {
  const sql = `UPDATE empresas SET ? WHERE id_empresa = ${req.params.id}`;
  db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/empresas/:id', (req, res) => {
  const sql = `DELETE FROM empresas WHERE id_empresa = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CRUD para vuelos
app.get('/vuelos', (req, res) => {
    const sql = 'SELECT * FROM vuelos';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  app.post('/vuelos', (req, res) => {
    const { id_empresa, id_destino, horario, comentarios } = req.body;
    const sql = 'INSERT INTO vuelos (id_empresa, id_destino, horario, comentarios) VALUES (?, ?, ?, ?)';
    db.query(sql, [id_empresa, id_destino, horario, comentarios], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  app.put('/vuelos/:id', (req, res) => {
    const id_vuelo = req.params.id;
    const { id_empresa, id_destino, horario, comentarios } = req.body;
    const sql = `UPDATE vuelos SET id_empresa = ?, id_destino = ?, horario = ?, comentarios = ? WHERE id_vuelo = ?`;
    db.query(sql, [id_empresa, id_destino, horario, comentarios, id_vuelo], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  app.delete('/vuelos/:id', (req, res) => {
    const id_vuelo = req.params.id;
    const sql = `DELETE FROM vuelos WHERE id_vuelo = ?`;
    db.query(sql, [id_vuelo], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });