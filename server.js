const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://DelApp:delappdelapp@cluster0.uojol.mongodb.net/DeliveryApp?retryWrites=true&w=majority", {useNewUrlParser: true}).then(
  () => {
    console.log('Connected to Database');

  },
  err => {
    console.log("connection error: ${err}")
  }
);

const productsRouter = require('./backend/routes/products');
// const ordersRouter = require('./routes/orders');
// const customersRouter = require('./routes/customers');
// const workersRouter = require('./routes/workers');

app.use('/products', productsRouter);
// app.use('/orders', ordersRouter);
// app.user('/customers', customersRouter);
// app.use('/workers', workersRouter);

app.listen(port, () => {
  console.log('server is running on port: ' + port);
})
