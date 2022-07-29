var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var recipeRouter = require('./routes/recipes');


var app = express();
app.listen(3000, ()=>{
    console.log('server started on port 3000')
});
app.get('/test', function(req, res, next) {
    res.send('<p>Test</p>');
  });
//   app.get('/recipes', (req, res) => {
//     res.json(recipes)
// })
// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/recipes', recipeRouter);

module.exports = app;
