<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <!-- .prevent cancela la recarga de la página cuando se manda datos en el button-->
              <form @submit.prevent="sendPanel">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="panel.name"
                    placeholder="Nom du panneau"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="panel.azimut"
                    placeholder="Azimut"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="panel.elevation"
                    placeholder="Élévation"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    v-model="panel.description"
                    placeholder="Description"
                    name="Description"
                    id
                    cols="30"
                    rows="2"
                  ></textarea>
                </div>
                <template v-if="edit===false">
                  <button class="btn btn-primary btn-block">Enviar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Modifier</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Azimut</th>
                <th>Elévation</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="panel of panels" :key="panel._id">
                <td>{{panel.name}}</td>
                <td>{{panel.azimut}}</td>
                <td>{{panel.elevation}}</td>
                <td>{{panel.description}}</td>
                <td>
                  <button @click="deletePanel(panel._id)" class="btn btn-danger">Suprimer</button>
                  <button @click="updatePanel(panel._id)" class="btn btn-secondary">Modifier</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Panel {
  constructor(name, azimut, elevation, description) {
    this.name = name;
    this.azimut = azimut;
    this.elevation = elevation;
    this.description = description;
  }
}
export default {
  data() {
    return {
      panel: new Panel(),
      panels: [] /* array pour remplir les données de la bd, c'est-à-dire les panneaux*/,
      edit: false,
      panelToEdit: ""
    };
  },
  created() {
    this.getPanels();
  },
  methods: {
    sendPanel() {
      if (this.edit === false) {
        /*
      console.log(this.panel); */
        /* fetch ce qui fait c'est qu'il peut demander et envoyer des données au serveur*/
        fetch("/api/panel", {
          method: "POST",
          body: JSON.stringify(this.panel),
          headers: {
            Accept:
              "application/json" /* C'est pour indiquer qu'on va envoyer des données de type json*/,
            "Content-type": "application/json"
          }
        }) /* On fait un promise then pour apporter les donnéés mais on l'apporte en format json*/
          .then(res => res.json())
          .then(data => this.getPanels()); //pour actualiser toujours les données après de chaque enregistrement
      } else {
        fetch("api/panel/" + this.panelToEdit, {
          method: "PUT",
          body: JSON.stringify(this.panel),
          headers: {
            Accept:
              "application/json" /* C'est pour indiquer qu'on va envoyer des données de type json*/,
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getPanels();
            this.edit = false;
          });
      }

      /* pour effacer les données quand on charge la page */
      this.panel = new Panel();
    },
    getPanels() {
      fetch("/api/panel")
        .then(res => res.json())
        .then(data => {
          this.panels = data["panels"]; /* Il faut espéficier l'array */
          console.log(this.panels);
        });
    },
    deletePanel(id) {
      fetch("/api/panel/" + id, {
        method: "DELETE",
        headers: {
          Accept: "Application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getPanels();
        });
    },
    updatePanel(id) {
      fetch("/api/panel/" + id)
        .then(res => res.json())
        .then(data => {
          this.panel = new Panel(
            data["panel"].name,
            data["panel"].azimut,
            data["panel"].elevation,
            data["panel"].description
          );
          this.panelToEdit = data["panel"]._id;
          this.edit = true;
        });
    }
  }
};
</script>

<style>
</style>