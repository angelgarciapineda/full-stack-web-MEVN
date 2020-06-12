const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

/* mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Erreur pour connecter à la base de données ${err}`);
  }
  //console.log("Connection à la base de données");
  console.log(`Connection à la base de données ${config.db}`);
  app.listen(config.port, () => {
    console.log(`API REST en http://localhost:${config.port}`);
  });
}); */

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
