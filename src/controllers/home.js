"use strict";
const Home = require("../models/home");
const Panel = require("../models/panel");
const Target = require("../models/target");
const TimeSlot = require("../models/timeslot");
//#region
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
/* Fonction pour obtenir un Panneau en particulier */
function getPanel(req, res) {
    let PanelId = req.params.panelId;
    Panel.findById(PanelId, (err, panel) => {
        if (err)
            return res
                .status(500)
                .send({ message: `Erreur ${err}` });
        if (!panel)
            return res.status(404).send({ message: `Le logement n'existe pas` });
        res.status(200).send({ panel });
    });
}
/* Fonction pour effacer un panneau en particulier */
function deletePanel(req, res) {
    Panel.findByIdAndRemove({ _id: req.params.panelId }, (err, panelRemoved) => {
        if (err) {
            res.status(500).send({ message: "ERREUR : ", err })
        }
        if (!panelRemoved) {
            res.status(400).send({ message: "ERREUR ne se peut pas effacer le logement" })
        }
        else {
            /* Après d'effacer le panneau on supprime la référence
            qui existe dans le modèle de "Home" */
            Home.findByIdAndUpdate({ _id: req.params.homeId }, {
                '$pull': {
                    'panels': req.params.panelId
                }
            }, (err, updatePanel) => {
                if (err) {
                    res.status(500).send({ message: `ERREUR ${err}` })
                }
                if (!updatePanel) {
                    res.status(400).send({ message: `Suppression pas réussie` })
                }
                res.status(200).send({ message: `Suppression réussie du logement ${panelRemoved} ` + ` Modification réussie de référence ${updatePanel}` })
            })
        }
    })
}
/* Fonction pour modifier un pannneau en particulier */
function updatePanel(req, res) {
    let panelId = req.params.panelId;
    let update = req.body;
    Panel.findByIdAndUpdate(panelId, update, (err, panelUpdated) => {
        if (err)
            res
                .status(500)
                .send({ message: `Erreur lors de la modification du logement : ${err}` });
        res.status(200).send({ panel: panelUpdated });
    });
}
/* Fonction pour enregistrer un cible dans la maison */
function addTarget(req, res) {
    let t = new Target();
    t.name = req.body.name;
    t.latitude = req.body.latitude;
    t.longitude = req.body.longitude;

    t.save()
    /* Pour réaliser la référence du cible avec la maison
    on doit modifier l'attribut de "targets" qui se trouve dans le modèle de "Home" */
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
/* Fonction pour obtenir un cible en particulier */
function getTarget(req, res) {
    let TargetId = req.params.targetId;
    Target.findById(TargetId, (err, target) => {
        if (err)
            return res
                .status(500)
                .send({ message: `Erreur ${err}` });
        if (!target)
            return res.status(404).send({ message: `Le logement n'existe pas` });
        res.status(200).send({ target });
    });
}
/* Fonction pour effacer un cible en particulier */
function deleteTarget(req, res) {
    Target.findByIdAndRemove({ _id: req.params.targetId }, (err, targetRemoved) => {
        if (err) {
            res.status(500).send({ message: "ERREUR : ", err })
        }
        if (!targetRemoved) {
            res.status(400).send({ message: "ERREUR ne se peut pas effacer le logement" })
        }
        else {
            /* Après d'effacer le cible on supprime la référence
            qui existe dans le modèle de "Home" */
            Home.findByIdAndUpdate({ _id: req.params.homeId }, {
                '$pull': {
                    'targets': req.params.targetId
                }
            }, (err, updateTarget) => {
                if (err) {
                    res.status(500).send({ message: `ERREUR ${err}` })
                }
                if (!updatePanel) {
                    res.status(400).send({ message: `Suppression pas réussie` })
                }
                res.status(200).send({ message: `Suppression réussie du logement ${targetRemoved} ` + ` Modification réussie de référence ${updateTarget}` })
            })
        }
    })
}
/* Fonction pour modifier un cible en particulier */
function updateTarget(req, res) {
    let targetId = req.params.targetId;
    let update = req.body;
    Target.findByIdAndUpdate(targetId, update, (err, targetUpdated) => {
        if (err)
            res
                .status(500)
                .send({ message: `Erreur lors de la modification du logement : ${err}` });
        res.status(200).send({ target: targetUpdated });
    });
}
//#endregion
/* Fonction pour enregistrer un cible dans la maison */
function addTimeSlot(req, res) {
    let ts = new TimeSlot();
    ts.name = req.body.name;
    ts.startdate = req.body.startdate;
    ts.enddate = req.body.enddate;
    ts.starttime = req.body.starttime;
    ts.endtime = req.body.endtime;
    ts.days = req.body.days;
    ts.panel = req.body.idpanel;
    ts.target = req.body.idtarget;

    ts.save()
    /* Pour réaliser la référence d'une plage horaire avec la maison
    on doit modifier l'attribut de "time_slots" qui se trouve dans le modèle de "Home" */
    Home.updateOne({ _id: req.params.homeId }, {
        $push: {
            "time_slots": ts._id
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
                    msj: "La plage horaire a été ajoutée avec succès",
                    id_timeSlot: ts._id,
                });
            }
        })
    console.log(ts);

}
//Fonction pour obtenir les plages horaires d'une maison en particulier
function getTimeSlots(req, res) {
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
/* Fonction pour obtenir une plage horaire en particulier */
function getTimeSlot(req, res) {
    let TargetId = req.params.targetId;
    Target.findById(TargetId, (err, target) => {
        if (err)
            return res
                .status(500)
                .send({ message: `Erreur ${err}` });
        if (!target)
            return res.status(404).send({ message: `Le logement n'existe pas` });
        res.status(200).send({ target });
    });
}
/* Fonction pour effacer une plage horaire en particulier */
function deleteTimeSlot(req, res) {
    Target.findByIdAndRemove({ _id: req.params.targetId }, (err, targetRemoved) => {
        if (err) {
            res.status(500).send({ message: "ERREUR : ", err })
        }
        if (!targetRemoved) {
            res.status(400).send({ message: "ERREUR ne se peut pas effacer le logement" })
        }
        else {
            /* Après d'effacer la plage horaire on supprime la référence
            qui existe dans le modèle de "Home" */
            Home.findByIdAndUpdate({ _id: req.params.homeId }, {
                '$pull': {
                    'targets': req.params.targetId
                }
            }, (err, updateTarget) => {
                if (err) {
                    res.status(500).send({ message: `ERREUR ${err}` })
                }
                if (!updatePanel) {
                    res.status(400).send({ message: `Suppression pas réussie` })
                }
                res.status(200).send({ message: `Suppression réussie du logement ${targetRemoved} ` + ` Modification réussie de référence ${updateTarget}` })
            })
        }
    })
}
/* Fonction pour modifier une plage horarire en particulier */
function updateTimeSlot(req, res) {
    let targetId = req.params.targetId;
    let update = req.body;
    Target.findByIdAndUpdate(targetId, update, (err, targetUpdated) => {
        if (err)
            res
                .status(500)
                .send({ message: `Erreur lors de la modification du logement : ${err}` });
        res.status(200).send({ target: targetUpdated });
    });
}
//Fonction pour obtenir les plages horaires d'une maison en particulier
function getPanels_Targets(req, res) {
    Home.findById({ _id: req.params.homeId })
        .populate('panels')
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
    getPanel,
    deletePanel,
    updatePanel,
    addTarget,
    getTargets,
    getTarget,
    deleteTarget,
    updateTarget,
    addTimeSlot,
    getTimeSlots,
    getTimeSlot,
    deleteTimeSlot,
    updateTimeSlot,
    getPanels_Targets
};