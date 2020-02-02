const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Router Definitions
 */
const indexRouter = require('./routes/index');
const apiV1Router = require('./routes/apiV1');

// swagger options
const swaggerConf = require('./swagger.conf');

const swaggerDocument = swaggerJSDoc(swaggerConf);

// Creates a express app
const app = express();
// Logger initiation
const logger = require('./config/logger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setting-up custom logger stream to the app logger
app.use(morgan('combined', { stream: logger.stream }));
// Body parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router Wiring
app.use('/', indexRouter);
app.use('/api/v1/', apiV1Router);
app.use('/docs/api/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/docs/code/', express.static(path.join(__dirname, 'documentation')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error('CoreApp#GlobalErrorHandler :: Error :: ', err);
  // render the error page
  res.status(err.status || 500);
  res.send('Internal Server Error...!');
});

module.exports = app;
