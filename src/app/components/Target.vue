<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-5">
        <b-card bg-variant="light">
          <b-form @submit.prevent="addTarget" autocomplete="off">
            <p class="h2">Choissisez une maison :</p>
            <b-form-select v-model="selected" @change="getTargets">
              <option v-for="home of homes" :key="home._id" :value="home">{{home.name}}</option>
            </b-form-select>
            <p>Maison : {{selected.name}}</p>
            <p>Rue : {{selected.street}}</p>
            <b-form-group
              label-cols-lg="3"
              label="Créer un nouveau cible"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group label-cols-sm="3" label="Nom:" label-align-sm="right">
                <b-form-input v-model="target.name"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Latitude:" label-align-sm="right">
                <b-form-input v-model="target.latitude"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Longitude:" label-align-sm="right">
                <b-form-input v-model="target.longitude"></b-form-input>
              </b-form-group>
              <p style="color:red">{{message}}</p>
              <b-form-group v-if="edit===false">
                <b-button type="submit" variant="dark" style="float:right">Enregistrer</b-button>
              </b-form-group>
              <b-form-group v-else>
                <b-button type="submit" variant="dark" style="float:right">Modifier</b-button>
              </b-form-group>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
      <div class="col-md-7">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="target of targets" :key="target._id">
              <td>{{target.name}}</td>
              <td>{{target.latitude}}</td>
              <td>{{target.longitude}}</td>
              <td>
                <!-- <button class="btn btn-danger">Suprimer</button> -->
                <b-button @click.prevent="deleteTarget(target._id)" type="submit" variant="danger">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
                <b-button @click.prevent="updateTarget(target._id)" type="submit" variant="warning">
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
class Target {
  constructor(name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default {
  name: "Target",
  data() {
    return {
      target: new Target(),
      homes: [],
      targets: [],
      idUser: "",
      selected: "",
      edit: false,
      targetToEdit: "",
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
          /* console.log(res.data);
          console.log(res.data.user.homes); */
          this.homes = res.data.user.homes;
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    addTarget() {
      if (this.edit === false) {
        this.axios
          .post(`/target/${this.selected._id}`, this.target)
          .then(res => {
            this.getTargets();
            this.message = res.data.message;
          })
          .catch(error => {
            console.log("ERREUR : ", error);
            this.message = error.response.data.message;
          });
      } else {
        this.axios
          .put(`/target/${this.targetToEdit}`, this.target)
          .then(res => {
            this.getTargets();
            this.message = res.data.message;
          })
          .catch(error => {
            console.log(error.response);
            this.message = error.response.data.message;
          });
        this.edit = false;
      }
      /* pour effacer les données quand on charge la page */
      this.target = new Target();
    },
    getTargets() {
      this.axios
        .get(`/target/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          this.targets = res.data.home.targets;
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    deleteTarget(id) {
      this.axios
        .delete(`/target/${id}/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          this.getTargets();
        })
        .catch(error => {
          console.log("ERREUR : ", error.response);
        });
    },
    updateTarget(id) {
      this.axios
        .get(`/target/${id}/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          /* Cest pour remplir le formulaire */
          this.target = new Target(
            res.data["target"].name,
            res.data["target"].latitude,
            res.data["target"].longitude
          );
          this.targetToEdit = res.data["target"]._id;
          this.edit = true;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
</style>