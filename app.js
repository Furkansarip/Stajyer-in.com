const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const jobRoute = require('./routes/jobRoute');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Connnect DB
mongoose
  .connect('mongodb://localhost/CI-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connected');
  });

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', pageRoute);
app.use('/jobs', jobRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App created at ${port}`);
});
