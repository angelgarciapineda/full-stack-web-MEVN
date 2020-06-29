"use strict";
const Panel = require("../models/panel");

function getPanel(req, res) {
  let PanelId = req.params.panelId;
  Panel.findById(PanelId, (err, panel) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Erreur ${err}` });
    if (!panel)
      return res.status(404).send({ message: `Le panneau n'existe pas` });
    res.status(200).send({ panel });
  });
}

function getPanels(req, res) {
  Panel.find({}, (err, panels) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Erreur lors de la demande ${err}` });
    if (!panels)
      return res.status(404).send({ message: `Il n'y a pas de panneaux` });
    res.status(200).send({ panels });
  });
}

function updatePanel(req, res) {
  let panelId = req.params.panelId;
  let update = req.body;
  Panel.findByIdAndUpdate(panelId, update, (err, panelUpdated) => {
    if (err)
      res
        .status(500)
        .send({ message: `Erreur lors de la modification du panneau : ${err}` });
    res.status(200).send({ panel: panelUpdated });
  });
}
function deletePanel(req, res) {
  let panelId = req.params.panelId;

  Panel.findById(panelId, (err, panel) => {
    if (err)
      res.status(500).send({ message: `Erreur lors de la modification du panneau : ${err}` });
    panel.remove((err) => {
      if (err)
        res
          .status(500)
          .send({ message: `Erreur lors de la suppression du panneau  : ${err}` });
      res.status(200).send({ message: `Le panneau a été effacé` });
    });
  });
}
function savePanel(req, res) {
  console.log("POST /api/panel");
  console.log(req.body);
  let panel = new Panel();
  panel.name = req.body.name;
  panel.azimuth = req.body.azimuth;
  panel.elevation=req.body.elevation;

  panel.save((err, panelStored) => {
    if (err)
      res.status(500).send({ message: `Erreur pour enregistrer les données dans la base de données ${err}` });

    res.status(200).send({ panel: panelStored });
  });
}
module.exports = {
  getPanel,
  getPanels,
  updatePanel,
  deletePanel,
  savePanel,
};
