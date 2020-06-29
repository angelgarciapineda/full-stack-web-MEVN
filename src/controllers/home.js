"use strict";
const Home = require("../models/home");
const Panel = require("../models/panel");
const Target = require("../models/target");

/* Fonction pour enregistrer un panneau dans la maison */
function addPanel(req, res) {
    let p = new Panel();
    p.name = req.body.name;
    p.azimut = req.body.azimut;
    p.elevation = req.body.elevation;
    p.latitude = req.body.latitude;
    p.longitude = req.body.longitude;

    //save enregistre le panneau dans le modèle Panel
    p.save()
    /* Pour réaliser la réference du panneau avec la maison
    je dois modifier l'attribut de "panels" qui se trouve dans le modèle de "Home" */
    Home.updateOne({ _id: req.params.homeId }, {
        $push: {
            "panels": p._id
        }
    },
        (error) => {
            if (error) {
                res.json({
                    sucess: false,
                    msj: "Il y a un érreur: ",
                    error
                });
            } else {
                res.json({
                    sucess: true,
                    msj: "Le panneau a été ajoutée avec succès",
                    id_panel: p._id
                });
            }
        })

}
//Fonction pour obtenir les panneaux d'une maison en particulier
function getPanels(req, res) {
    Home.findById({ _id: req.params.homeId })
        .populate('panels')
        .exec((err, home) => {
            if (err)
                return res.status(500).send({ message: `Erreur ${err}` });
            if (!home)
                return res.status(400).send({ message: `On ne peut pas trouver les données de ce logement` })

            return res.status(200).send({ home });
        })
}
/* Fonction pour enregistrer un cible dans la maison */
function addTarget(req, res) {
    let t = new Target();
    t.name = req.body.name;
    t.latitude = req.body.latitude;
    t.longitude = req.body.longitude;

    t.save()
    /* Pour réaliser la réference du cible avec la maison
    je dois modifier l'attribut de "targets" qui se trouve dans le modèle de "Home" */
    Home.updateOne({ _id: req.params.homeId }, {
        $push: {
            "targets": t._id
        }
    },
        (error) => {
            if (error) {
                res.json({
                    sucess: false,
                    msj: "Il y a un érreur: ",
                    error
                });
            } else {
                res.json({
                    sucess: true,
                    msj: "Le cible a été ajoutée avec succès",
                    id_target: t._id
                });
            }
        })

}
//Fonction pour obtenir les cibles d'une maison en particulier
function getTargets(req, res) {
    Home.findById({ _id: req.params.homeId })
        .populate('targets')
        .exec((err, home) => {
            if (err)
                return res.status(500).send({ message: `Erreur ${err}` });
            if (!home)
                return res.status(400).send({ message: `On ne peut pas trouver les données de ce logement` })

            return res.status(200).send({ home });
        })
}

module.exports = {
    addPanel,
    getPanels,
    addTarget,
    getTargets
};