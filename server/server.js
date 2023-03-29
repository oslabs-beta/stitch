// SERVER INFO
const express = require('express');
const path = require('path');
const app = express();
const dataController = require('./controllers/dataController');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendStatus(200);
});
// test1 api 
app.get('/one', dataController.getOne, (req, res) => {
  res.status(200).json(res.locals.data);
});
//test2 a lot of info in MewTwo Pokemon
app.get('/pokemon', dataController.getPokemon, (req, res) => {
  res.status(200).json(res.locals.data);
});

// dynamic endpoint


// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
