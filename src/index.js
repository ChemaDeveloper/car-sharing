'use strict'
var constants = require('./utils/Constants.js')
const userApp = require('./Api/UserApp')
const moneyBoxApi = require('./Api/MoneyBoxApi')
const express = require('express')
const bodyParser = require('body-parser');

// App
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userApp)
app.use('/rewards', moneyBoxApi)

app.listen(constants.PORT, constants.HOST);
console.log(`Running on http://${constants.HOST}:${constants.PORT}`);
