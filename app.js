require('dotenv').config()


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const categoryRoutes = require('./routes/APIcategory');
const productRoutes = require('./routes/APIproduct');


var app = express();


let message = '';

app.use((req, res, next) => {
    res.locals.message = message;
    message = ''; // Reset thông báo sau khi truyền
    next();
}); 
const hbs = require('handlebars');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
      openapi: "3.0.0",
      info: {
          title: "Toy Store API",
          version: "1.0.0",
          description: "API documentation for Toy Store application",
      },
      servers: [
          {
              url: "http://localhost:3001",
          },
      ],
  },
  apis: ["./routes/*.js"], // Tìm các tệp trong thư mục routes
};

// Tạo swagger specification
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Thiết lập Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes API
app.use('/APIcategories', categoryRoutes);
app.use('/APIproducts', productRoutes);
//Routes 
const categories = require('./routes/catgoties');
app.use('/categories', categories);
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
//conect database
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_DELOY)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


  
  
  


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routes/admin');
app.use('/', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
