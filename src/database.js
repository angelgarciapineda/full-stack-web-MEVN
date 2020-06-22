const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (db) => console.log(`Connection à la base de données ${config.db}`),
    app.listen(config.port, () => {
      console.log(`API REST en http://localhost:${config.port}`);
    })
  )
  .catch((err) => console.error(err));
