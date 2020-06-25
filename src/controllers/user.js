"use strict";
const User = require("../models/user");
const Home = require("../models/home");
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
        iduser: user._id
      });
    });
  }).select("_id email +password");
}
function addHome(req, res) {
  let h = new Home();
  h.name = req.body.name;
  h.street = req.body.street;
  h.postalcode = req.body.postalcode;
  h.city = req.body.city;
  h.latitude = req.body.latitude;
  h.longitude = req.body.longitude;

  h.save()
  //Réaliser la réference
  User.updateOne({ _id: req.params.userId }, {
    $push: {
      "homes": h._id
    }
  },
    (error) => {
      if (error) {
        res.json({
          sucess: false,
          msj: "No se pudo hacer la referencia",
          error
        });
      } else {
        res.json({
          sucess: true,
          msj: "La maison a été ajoutée avec succès",
          id_home: h._id
        });
      }
    })

}
function getHomes(req, res) {
  User.findById({ _id: req.params.userId })
    .populate('homes')
    .exec((err, user) => {
      if (err)
        return res.status(500).send({ message: `Erreur ${err}` });
      if (!user)
        return res.status(400).send({ message: `On ne peut pas trouver les données de cet utilisateur` })

      //let _homes = users.homes;
      return res.status(200).send({ user });
    })
}


/* function addHome(req, res) {
  let h;
  if (req.params.userId) {
    User.update({ _id: req.params.userId }, {
      $push: {
        "homes": h = new Home({
          name: req.body.name,
          street: req.body.street,
          postalcode: req.body.postalcode,
          city: req.body.city,
          latitude: req.body.latitude,
          longitude: req.body.longitude
        })
      }
    },
      (error) => {
        if (error) {
          return res.json({
            sucess: false,
            msj: "La maison ne peut pas être fouillée",
            error
          });
        } else {
          return res.json({
            sucess: true,
            msj: "La maison a été ajoutée avec succès",
            id_home: h._id
          });
        }
      })
  } else {
    return res.json({
      sucess: false,
      msj: "L'utilisateur n'existe pas"
    });
  }
} */
module.exports = {
  signIn,
  signUp,
  addHome,
  getHomes
};
