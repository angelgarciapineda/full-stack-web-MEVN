const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const api = require("./routes");
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);
// Para acceder al directorio actual
const path = require('path');

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname+"/public"));

module.exports = app;
