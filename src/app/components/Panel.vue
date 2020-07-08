<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-4">
        <b-card bg-variant="light">
          <b-form @submit.prevent="addPanel" autocomplete="off">
            <p class="h2">Choissisez une maison :</p>
            <b-form-select v-model="selected" @change="getPanels">
              <b-form-select-option
                v-for="home of homes"
                :key="home._id"
                :value="home"
              >{{home.name}}</b-form-select-option>
              <!-- <option v-for="home of homes" :key="home._id" :value="home">{{home.name}}</option> -->
            </b-form-select>
            <p>Maison : {{selected.name}}</p>
            <p>Rue : {{selected.street}}</p>
            <b-form-group>
              <b-button
                block
                @click.prevent="getLocation"
                type="submit"
                variant="dark"
              >Obtenir mes coordonnées</b-button>
            </b-form-group>
            <b-form-group label-cols-sm="3" label="Nom:" label-align-sm="right">
              <b-form-input v-model="panel.name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Azimuth:" label-align-sm="right">
              <b-form-input v-model="panel.azimuth"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Hauteur:" label-align-sm="right">
              <b-form-input v-model="panel.elevation"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Latitude:" label-align-sm="right">
              <b-form-input v-model="panel.latitude"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Longitude:" label-align-sm="right">
              <b-form-input v-model="panel.longitude"></b-form-input>
            </b-form-group>
            <p style="color:red">{{message}}</p>
            <b-form-group v-if="edit===false">
              <b-button type="submit" variant="dark" style="float:right">Enregistrer</b-button>
            </b-form-group>
            <b-form-group v-else>
              <b-button type="submit" variant="dark" style="float:right">Modifier</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
      <div class="col-md-8">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th>Panel</th>
              <th>Azimuth</th>
              <th>Hauteur</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="panel of panels" :key="panel._id">
              <td>{{panel.name}}</td>
              <td>{{panel.azimuth}}</td>
              <td>{{panel.elevation}}</td>
              <td>{{panel.latitude}}</td>
              <td>{{panel.longitude}}</td>
              <td>
                <!-- <button class="btn btn-danger">Suprimer</button> -->
                <b-button @click.prevent="deletePanel(panel._id)" type="submit" variant="danger">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
                <b-button @click.prevent="updatePanel(panel._id)" type="submit" variant="warning">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
                <!-- <button class="btn btn-secondary">Modifier</button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
class Panel {
  constructor(name, azimuth, elevation, latitude, longitude) {
    this.name = name;
    this.azimuth = azimuth;
    this.elevation = elevation;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default {
  name: "Panel",
  data() {
    return {
      panel: new Panel(),
      panels: [],
      homes: [],
      idUser: "",
      selected: "",
      edit: false,
      panelToEdit: "",
      message: ""
    };
  },
  created() {
    this.idUser = this.$route.params.id;
    this.getHomes();
  },
  methods: {
    getHomes() {
      this.axios
        .get(`/home/${this.idUser}`)
        .then(res => {
          this.homes = res.data.user.homes;
        })
        .catch(error => {
          console.log("ERREUR: ", error);
        });
    },
    addPanel() {
      if (this.edit === false) {
        this.axios
          .post(`/panel/${this.selected._id}`, this.panel)
          .then(res => {
            this.getPanels();
            this.message = res.data.message;
          })
          .catch(error => {
            console.log("ERREUR : ", error);
            this.message = error.response.data.message;
          });
      } else {
        this.axios
          .put(`/panel/${this.panelToEdit}`, this.panel)
          .then(res => {
            this.getPanels();
            this.message = res.data.message;
          })
          .catch(error => {
            console.log(error.response);
            this.message = error.response.data.message;
          });
        this.edit = false;
      }
      /* pour effacer les données quand on charge la page */
      this.panel = new Panel();
    },
    getPanels() {
      this.axios
        .get(`/panel/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          this.panels = res.data.home.panels;
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    deletePanel(id) {
      this.axios
        .delete(`/panel/${id}/${this.selected._id}`)
        .then(res => {
          this.getPanels();
        })
        .catch(error => {
          console.log("ERREUR : ", error.response);
        });
    },
    updatePanel(id) {
      this.axios
        .get(`/panel/${id}/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          /* Cest pour remplir le formulaire */
          this.panel = new Panel(
            res.data["panel"].name,
            res.data["panel"].azimuth,
            res.data["panel"].elevation,
            res.data["panel"].latitude,
            res.data["panel"].longitude
          );
          this.panelToEdit = res.data["panel"]._id;
          this.edit = true;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    success(pos) {
      let crd = pos.coords;
      this.panel.latitude = crd.latitude.toFixed(4);
      this.panel.longitude = crd.longitude.toFixed(4);
    },
    error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        this.options
      );
    }
  }
};
</script>