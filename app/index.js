const express = require('express')
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const path = require('path');
const appRoot = require("app-root-path");
const methodOverride = require("method-override");
const paginate = require('express-paginate');

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express()

const publicDir = path.join(__dirname, "./public")
app.use(express.static(publicDir));

app.use(paginate.middleware(10, 50));

// view engine
app.set("views", appRoot.resolve("app/views"));

// handlebars
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// ejs
// app.set("view engine", "ejs");


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use('/dummies', require('./routes/dummyRoutes.js'));
app.use('/samples', require('./routes/sampleRoutes'));
app.use('/', require('./routes/topRoutes'));


app.get("*", (req, res) => {
    res.send("<h1>存在しないページ</h1>");
});

app.use(errorHandler);

module.exports = app;


