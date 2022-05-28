const express = require('express');
const app = express();
var cors = require('cors')
const morgan=require('morgan');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

app.use(require('./routes/index'));