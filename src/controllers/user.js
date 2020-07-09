"use strict";
const User = require("../models/user");
const Home = require("../models/home");
const service = require("../services");

//Fonction pour s'inscrire
function signUp(req, res) {
  let user = new User();
  user.email = req.body.email;
  user.displayName = req.body.displayName;
  user.password = req.body.password;

  //user.gravatar() me donne l'url d'un avatar à partir du mail que l'utilisateur a mis
  user.avatar = user.gravatar();

  if (user.email == null || user.displayName == null || user.password == null) {
    return res.status(400).send({ message: "Il faut remplir tous les champs" })
  } else {
    //On enregistre l'utilisateur avec save()
    user.save((err) => {
      if (err)
        return res
          .status(500)
          .send({ message: `L'utilisateur existe déjà ${err}` });
      //S'il n'y a eu pas de problème je fais un réponse
      return res
        .status(200)
        .send({ auth: true, token: service.createToken(user) });
    });

  }
}
//Fonction pour se connecter
function signIn(req, res) {
  if (req.body.email == null || req.body.password == null) {
    return res.status(400).send({ message: "Il faut remplir tous les champs" });
  } else {
    //findOne recherche le email dans le modèle User
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err)
        return res.status(500).send({ message: `ERREUR: ${err}` });
      if (!user)
        return res
          .status(404)
          .send({ message: `L'utilisateur n'existe pas: ${req.body.email}` });

      /* comparePassword compare le mot de passe que l'utilisateur a mis avec le mot de passe
      qui se trouve dans la base de données crypté*/
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err)
          return res.status(500).send({ message: `ERREUR: ${err}` });
        if (!isMatch)
          return res
            .status(404)
            .send({ message: `Echec de la connexion: ${req.body.email}` });

        req.user = user;
        return res.status(200).send({
          message: "Connection réussie",
          token: service.createToken(user),
          iduser: user._id
        });
      });
    }).select("_id email +password");
  }
}
//Fonction pour enregistrer une maison
function addHome(req, res) {
  let h = new Home();
  h.name = req.body.name;
  h.street = req.body.street;
  h.postalcode = req.body.postalcode;
  h.city = req.body.city;
  h.latitude = req.body.latitude;
  h.longitude = req.body.longitude;

  if (h.name == null || h.street == null | h.postalcode == null || h.city == null || h.latitude == null || h.longitude == null) {
    return res.status(400).send({ message: "Il faut remplir tous les champs" })
  } else {
    //save enregistre l'objet de la maison
    h.save()
    /* Pour réaliser la réference de la maison avec l'utilisateur
    je dois modifier l'attribut de "homes" qui se trouve dans le modèle de "User" */
    User.updateOne({ _id: req.params.userId }, {
      $push: {
        "homes": h._id
      }
    },
      (error) => {
        if (error) {
          res.json({
            sucess: false,
            msj: "Il y a eu un érreur pour faire la référence",
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
}
//Fonction pour obtenir les maison d'un utilsateur en particulier
function getHomes(req, res) {
  //findById recherche s'il existe l'utilisateur
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
/* Fonction pour obtenir un logement en particulier */
function getHome(req, res) {
  let HomeId = req.params.homeId;
  Home.findById(HomeId, (err, home) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Erreur ${err}` });
    if (!home)
      return res.status(404).send({ message: `Le logement n'existe pas` });
    res.status(200).send({ home });
  });
}
/* Fonction pour effacer un logement en particulier */
function deleteHome(req, res) {
  Home.findByIdAndRemove({ _id: req.params.homeId }, (err, homeRemoved) => {
    if (err) {
      res.status(500).send({ message: "ERREUR : ", err })
    }
    if (!homeRemoved) {
      res.status(400).send({ message: "ERREUR ne se peut pas effacer le logement" })
    }
    else {
      /* Après d'effacer le logement on supprime la référence
      qui existe dans le modèle de "User" */
      User.findByIdAndUpdate({ _id: req.params.userId }, {
        '$pull': {
          'homes': req.params.homeId
        }
      }, (err, updateHome) => {
        if (err) {
          res.status(500).send({ message: `ERREUR ${err}` })
        }
        if (!updateHome) {
          res.status(400).send({ message: `Suppression pas réussie` })
        }
        res.status(200).send({ message: `Suppression réussie du logement ${homeRemoved} ` + ` Modification réussie de référence ${updateHome}` })
      })
    }
  })
}
/* Fonction pour modifier un logement en particulier */
function updateHome(req, res) {
  let homeId = req.params.homeId;
  let update = req.body;
  Home.findByIdAndUpdate(homeId, update, (err, homeUpdated) => {
    if (err)
      res
        .status(500)
        .send({ message: `Erreur lors de la modification du logement : ${err}` });
    res.status(200).send({ home: homeUpdated });
  });
}
module.exports = {
  signIn,
  signUp,
  addHome,
  getHomes,
  deleteHome,
  updateHome,
  getHome
};
