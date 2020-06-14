"use strict";
const Panel = require("../models/panel");

function getPanel(req, res) {
  let PanelId = req.params.panelId; //req.params.PanelId recibe el id del panel que aparece en la url
  Panel.findById(PanelId, (err, panel) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición ${err}` });
    if (!panel)
      return res.status(404).send({ message: `El panel no existe` });
    res.status(200).send({ panel }); //existe
  });
}

function getPanels(req, res) {
  Panel.find({}, (err, panels) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la peticón ${err}` });
    if (!panels)
      return res.status(404).send({ message: `No existen Panelos` });
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
        .send({ message: `Error al modificar el Panelo: ${err}` });
    res.status(200).send({ panel: panelUpdated });
  });
}
function deletePanel(req, res) {
  let panelId = req.params.panelId;

  Panel.findById(panelId, (err, panel) => {
    if (err)
      res.status(500).send({ message: `Error al borrar el Panelo: ${err}` });
    panel.remove((err) => {
      if (err)
        res
          .status(500)
          .send({ message: `Error al borrar el Panelo: ${err}` });
      res.status(200).send({ message: `El Panelo ha sido borrado` });
    });
  });
}
function savePanel(req, res) {
  console.log("POST /api/panel");
  console.log(req.body);
  let panel = new Panel();
  panel.name = req.body.name;
  panel.azimut = req.body.azimut;
  panel.elevation=req.body.elevation;
  panel.description = req.body.description;

  panel.save((err, panelStored) => {
    if (err)
      res.status(500).send({ message: `Error al salvar en la BD ${err}` });

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
