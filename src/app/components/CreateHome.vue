<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-4">
        <b-card bg-variant="light">
          <b-form @submit.prevent="saveHome" autocomplete="off">
            <p class="h2">Créer un nouveau logement :</p>
            <b-form-group label-cols-sm="3" label="Nom:" label-align-sm="right">
              <b-form-input v-model="home.name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Rue:" label-align-sm="right">
              <b-form-input v-model="home.street"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Code Postal:" label-align-sm="right">
              <b-form-input v-model="home.postalcode"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Ville:" label-align-sm="right">
              <b-form-input v-model="home.city"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Latitude:" label-align-sm="right">
              <b-form-input v-model="home.latitude"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Longitude:" label-align-sm="right">
              <b-form-input v-model="home.longitude"></b-form-input>
            </b-form-group>

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
        <p class="h5">Si vous ne connaissez pas votre latitude et longitude consultez-les ici :</p>
        <b-form-group>
          <b-button
            @click.prevent="getLocation"
            type="submit"
            variant="dark"
          >Obtenir mes coordonnées</b-button>
        </b-form-group>
        <p>Latitude actuelle: {{lat}}</p>
        <p>Longitude actuelle:{{lon}}</p>
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Rue</th>
              <th>Code Postal</th>
              <th>Ville</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="home of homes" :key="home._id">
              <td>{{home.name}}</td>
              <td>{{home.street}}</td>
              <td>{{home.postalcode}}</td>
              <td>{{home.city}}</td>
              <td>{{home.latitude}}</td>
              <td>{{home.longitude}}</td>
              <td>
                <!-- <button class="btn btn-danger">Suprimer</button> -->
                <b-button @click="deleteHome(home._id)" type="submit" variant="danger">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
                <b-button @click="updateHome(home._id)" type="submit" variant="warning">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
class Home {
  constructor(name, street, postalcode, city, latitude, longitude) {
    this.name = name;
    this.street = street;
    this.postalcode = postalcode;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default {
  name: "CreateHome",
  data() {
    return {
      home: new Home(),
      homes: [],
      idUser: "",
      edit: false,
      homeToEdit: "",
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      },
      lat: "",
      lon: ""
    };
  },
  created() {
    this.idUser = this.$route.params.id;
    this.getHomes();
  },
  methods: {
    saveHome() {
      if (this.edit === false) {
        this.axios
          .post(`/home/${this.idUser}`, this.home)
          .then(res => {
            /* console.log(res.data); */
            this.getHomes();
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.axios
          .put(`/home/${this.homeToEdit}`, this.home)
          .then(res => {
            this.getHomes();
          })
          .catch(error => {
            console.log(error.response);
          });
        this.edit = false;
      }
      /* pour effacer les données quand on charge la page */
      this.home = new Home();
    },
    getHomes() {
      this.axios
        .get(`/home/${this.idUser}`)
        .then(res => {
          this.homes = res.data.user.homes;
        })
        .catch(error => {
          console.log("Hay un error: ", error.response);
        });
    },
    deleteHome(id) {
      this.axios
        .delete(`/home/${id}/${this.idUser}`)
        .then(res => {
          console.log(res.data);
          this.getHomes();
        })
        .catch(error => {
          console.log("ERREUR : ", error.response);
        });
    },
    updateHome(id) {
      this.axios
        .get(`/home/${id}/${this.idUser}`)
        .then(res => {
          console.log(res.data);
          /* Cest pour remplir le formulaire */
          this.home = new Home(
            res.data["home"].name,
            res.data["home"].street,
            res.data["home"].postalcode,
            res.data["home"].city,
            res.data["home"].latitude,
            res.data["home"].longitude
          );
          this.homeToEdit = res.data["home"]._id;
          this.edit = true;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    success(pos) {
      let crd = pos.coords;
      this.lat = crd.latitude.toFixed(4);
      this.lon = crd.longitude.toFixed(4);
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

<style>
</style>