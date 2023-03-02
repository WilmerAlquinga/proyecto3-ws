const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// control production or develop environment
const dotenv = require('dotenv');

// validate environment
if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.local' });
}

const app = express();
const port = 3000;

// Get connection by environment
const connection = require('./db/connection');

app.use(bodyParser.json());
app.use(cors({
  origin: ["*", "http://localhost:4200"]
}));

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM product', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM product WHERE product_id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

app.post('/products', (req, res) => {
  const { product_name, product_description, product_price, product_stock, product_date } = req.body;
  const current_date = new Date();
  connection.query('INSERT INTO product (product_name, product_description, product_price, product_stock, product_date) VALUES (?, ?, ?, ?, ?)', [product_name, product_description, product_price, product_stock, current_date], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { product_name, product_description, product_price, product_stock, product_date } = req.body;
  connection.query('UPDATE product SET product_name = ?, product_description = ?, product_price = ?, product_stock = ? WHERE product_id = ?', [product_name, product_description, product_price, product_stock, id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM product WHERE product_id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Init server
app.listen(port, process.env.SERVICE_NAME, () => {
  console.log(`Server running at http://${process.env.SERVICE_NAME}:${port}`);
});
