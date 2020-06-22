"use strict";
const User = require("../models/user");
const Home = require("../models/home");
const Panel = require("../models/panel");
const service = require("../services");

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
  });

  user.avatar = user.gravatar();
  user.save((err) => {
    if (err)
      return res
        .status(500)
        .send({ message: `L'utilisateur existe déjà ${err}` });

    return res
      .status(200)
      .send({ auth: true, token: service.createToken(user) });
  });
}
function addPanel(req, res) {
  let p;
  if (req.body._id) {
    User.update({ _id: req.body._id }, {
      $push: {
        "panels": p = new Panel({
          name: req.body.name,
          azimut: req.body.azimut,
          elevation: req.body.elevation
        })
      }
    },
      (error) => {
        if (error) {
          return res.json({
            sucess: false,
            msj: "No se puede agregar panel",
            error
          });
        } else {
          return res.json({
            sucess: true,
            msj: "Se agregó correctamente el panel",
            id_de_la_casa: p._id
          });
        }
      })
  } else {
    return res.json({
      sucess: false,
      msj: "No se puede agregar casa por favor especifique que el _id del usuario sea correcto"
    });
  }
}
function addHome(req, res) {
  let h;
  if (req.body._id) {
    User.update({ _id: req.body._id }, {
      $push: {
        "home": h = new Home({
          name: req.body.nom
        })
      }
    },
      (error) => {
        if (error) {
          return res.json({
            sucess: false,
            msj: "No se puede agregar casa",
            error
          });
        } else {
          return res.json({
            sucess: true,
            msj: "Se agregó correctamente la casa",
            id_de_la_casa: h._id
          });
        }
      })
  } else {
    return res.json({
      sucess: false,
      msj: "No se puede agregar casa por favor especifique que el _id del usuario sea correcto"
    });
  }
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).send({ message: `échec de la connexion: ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ msg: `L'utilisateur n'existe pas: ${req.body.email}` });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err)
        return res.status(500).send({ msg: `y échec de la connexion: ${err}` });
      if (!isMatch)
        return res
          .status(404)
          .send({ msg: `x échec de la connexion: ${req.body.email}` });

      req.user = user;
      return res.status(200).send({
        msg: "Connection réussie",
        token: service.createToken(user),
      });
    });
  }).select("_id email +password");
}


module.exports = {
  signIn,
  signUp,
  addHome
};
