const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const path = require('path');
const userRoute = require('./routes/userRoute')
const editUserRoute = require('./routes/editUserRoute')

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', userRoute);
app.use('/edit', editUserRoute);
app.use('/addUser', editUserRoute);
app.use('/delete', editUserRoute);
app.listen(3000, function(){
    console.log("App is listening on port 3000");
})
