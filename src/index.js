const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const route = require('./routes')
const db = require('./config/db');
const session = require('express-session');
const app = express()
const port = 3000

// connect db
db.connect()

// session login
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
  }));


// req.body
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


// http logger
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public/css')))

//template engine
app.engine( "hbs", engine({
    extname: '.hbs',
    helpers: {
      sum : (a,b) => a+b,
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// route
route(app)

app.listen(port, () => console.log('Example app listening'))
