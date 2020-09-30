var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var bodyParser = require('body-parser')
var http=require('http');

var userRouter = require('./routes/userRouter');
var productRouter=require('./routes/productRouter');
var prodsRouter = require('./routes/prodsRouter');
var orderRouter=require('./routes/ordersRouter');

const mongoose = require('mongoose');
const cors=require('cors');


var compression = require('compression')


const buildPath = path.join(__dirname, '..', 'build');
 
// compress all responses

const Users = require('./models/user');
const Products =require('./models/product');

var uploadRouter = require('./routes/picUpload');
const url = config.mongoUrl;
const connect = mongoose.connect(url,{useNewUrlParser: true}, { useUnifiedTopology: true },  {useCreateIndex: true});
mongoose.set('useFindAndModify',false);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });
var app = express();
app.use(cors());

app.use(express.static(buildPath));
app.use(express.static(path.join(__dirname+'public\images')));
app.use(compression())
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000000000000000000000,
    extended: true 
  }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log("heelo");
app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/imageupload', uploadRouter);
app.use('/subcategory',prodsRouter);
app.use('/orders',orderRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);