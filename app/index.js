const express = require('express')
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const path = require('path');
const appRoot = require("app-root-path");

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express()

// Set static folder
const publicDir = path.join(__dirname, "../public")
app.use(express.static(publicDir));

app.set('view engine', 'hbs');
app.set("views", appRoot.resolve("app/views"));



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/dummies', require('./routes/dummyRoutes.js'));
app.use('/samples', require('./routes/sampleRoutes'));
// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));



app.use(errorHandler);

module.exports = app;


