const express = require("express");
const app = express();
const api = require("./routes");
const morgan = require('morgan');
const cors = require('cors'); /* pas neccessaire */

//Middlewares
app.use(morgan('tiny'));
/* Express a body-parser dedans app.use(bodyParser.json());
c'est important quand on travaille avec API REST pour les formats json*/
app.use(express.json());

/* Routes */
app.use("/api", api);

app.use(cors());

// Para acceder al directorio actual
const path = require('path');

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname,'/public')));

module.exports = app;
