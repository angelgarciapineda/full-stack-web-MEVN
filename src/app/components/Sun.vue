<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-6">
        <b-card bg-variant="light" style="height:100%">
          <b-form @submit.prevent="getPositionSun" autocomplete="off">
            <p class="h2">Obtenir la position du soleil :</p><br>
            <b-form-group>
              <b-button
                @click.prevent="getLocation"
                type="submit"
                variant="dark"
              >Obtenir mes coordonnées</b-button>
            </b-form-group>
            <b-form-group label="Latitude:">
              <b-form-input v-model="sun.latitude"></b-form-input>
            </b-form-group>

            <b-form-group label="Longitude:">
              <b-form-input v-model="sun.longitude"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-calendar block v-model="sun.date" locale="fr-FR"></b-calendar>
            </b-form-group>

            <b-form-group>
              <b-form-input v-model="sun.time" type="time"></b-form-input>
            </b-form-group>
            <b-form-group label="GMT :" label-for="num">
              <b-form-input v-model="sun.gmtdiff" id="num" type="number" style="width:200px"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button block type="submit" variant="danger" style="right">Calculer</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
      <div class="col-md-6">
        <b-card bg-variant="light" style="height:100%">
          <p class="h2 mb-2">
            <b-icon icon="brightness-alt-high"></b-icon>
            Azimuth: {{azimuth}}°
          </p>
          <p class="h2 mb-2">
            <b-icon icon="house-fill"></b-icon>
            Hauteur: {{elevation}}°
          </p>
          <p class="h5 mb-2">
            <b-icon icon="calendar-date"></b-icon>
            Date: {{sun.date}}
          </p>
          <p class="h5 mb-2">
            <b-icon icon="clock"></b-icon>
            Heure: {{sun.time}}
          </p>
          <p class="h5 mb-2">
            <b-icon icon="brightness-alt-low"></b-icon>
            Latitude: {{sun.latitude}}
          </p>
          <p class="h5 mb-2">
            <b-icon icon="brightness-alt-high-fill"></b-icon>
            Longitude: {{sun.longitude}}
          </p>
          <p class="h5 mb-2">
            <b-icon icon="brightness-alt-high-fill"></b-icon>
            GMT {{sun.gmtdiff}}
          </p>

          <b-card bg-variant="dark" class="pt-5">
            <b-form @submit.prevent="getPanels" style="color:white">
              <p class="h4 mb-2 pb-5">Envoyer les angles au panneau:</p>
              <p>Choissisez une maison :</p>
              <b-form-select v-model="selected" @change="getPanels">
                <b-form-select-option
                  v-for="home of homes"
                  :key="home._id"
                  :value="home"
                >{{home.name}}</b-form-select-option>
              </b-form-select>
            </b-form>
            <b-form style="color:white">
              <p>Choissisez un panneau :</p>
              <b-form-select v-model="selectedPanel" @change="updatePanel(selectedPanel._id)">
                <b-form-select-option
                  v-for="panel of panels"
                  :key="panel._id"
                  :value="panel"
                >{{panel.name}}</b-form-select-option>
              </b-form-select>
              <b-form-group class="pt-5 pb-5">
                <b-button
                  @click.prevent="updatePanelAttributes()"
                  block
                  type="submit"
                  variant="light"
                  style="right"
                >Envoyer les angles</b-button>
              </b-form-group>
              <b-form-group>
                <p>Maison: {{selected.name}}</p>
                <p>Panel: {{selectedPanel.name}}</p>
                <p>Azimuth: {{azimuth}}</p>
                <p>Hauteur: {{elevation}}</p>
              </b-form-group>
            </b-form>
          </b-card>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
class Sun {
  constructor(date, time, latitude, longitude, gmtdiff) {
    this.date = date;
    this.time = time;
    this.latitude = latitude;
    this.longitude = longitude;
    this.gtmdiff = gmtdiff;
  }
}
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
  name: "Sun",
  data() {
    return {
      sun: new Sun(),
      panel: new Panel(),
      azimuth: "",
      elevation: "",
      idUser: "",
      homes: [],
      panels: [],
      selected: "",
      selectedPanel: "",
      panelToEdit: ""
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
          console.log("Hay un error: ", error);
        });
    },
    getPositionSun() {
      this.axios
        .post(`/position/sun`, this.sun)
        .then(res => {
          console.log(res.data);
          this.azimuth = res.data._azimuth.toFixed(2);
          this.elevation = res.data._altitude.toFixed(2);
        })
        .catch(error => {
          console.log("Erreur : ", error);
        });
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
          this.panelToEdit = res.data.panel._id;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    updatePanelAttributes() {
      this.panel.azimuth = this.azimuth;
      this.panel.elevation = this.elevation;

      this.axios
        .put(`/panel/${this.panelToEdit}`, this.panel)
        .then(res => {
          this.getPanels();
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    success(pos) {
      let crd = pos.coords;
      this.sun.latitude = crd.latitude.toFixed(4);
      this.sun.longitude = crd.longitude.toFixed(4);
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