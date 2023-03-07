const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const app = express();
const fs = require('fs');


require('dotenv').config();
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
	secret : process.env.SECRET,
	httpOnly : true
  }
}));

// 라우터 부착
fs.readdirSync(path.join(__dirname, '/routes'))
    .filter(file => file.indexOf('.') !== 0  && file.slice(-3) === ".js")
    .forEach(routeFile => {
      app.use(`/${routeFile.split('.')[0]}`, require(`./routes/${routeFile}`));
		});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
	console.log(app.get('port') +' 에서 대기중');
})