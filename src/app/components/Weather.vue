<template>
  <div class="row pt-5">
    <!-- Formulaire pour consulter la météo -->
    <div class="col-md-6">
      <b-card bg-variant="light" style="height:100%">
        <b-form @submit.prevent="getMeteo" autocomplete="off">
          <b-form-group
            label-cols-lg="3"
            label="Consulter la météo"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Latitude:"
              label-align-sm="right"
              label-for="nested-latitude"
            >
              <b-form-input id="nested-latitude" v-model="meteo._latitude"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Longitude:"
              label-align-sm="right"
              label-for="nested-longitude"
            >
              <b-form-input id="nested-longitude" v-model="meteo._longitude"></b-form-input>
            </b-form-group>
            <p style="color:red">{{message}}</p>
            <b-form-group>
              <b-button type="submit" variant="dark" style="float:right">
                <b-icon icon="search" aria-hidden="true"></b-icon>Consulter
              </b-button>
            </b-form-group>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <!-- Partie pour afficher les résults de la météo -->
    <div class="col-md-6">
      <b-card bg-variant="light" style="height:100%">
        <p class="h1 mb-2">
          <b-icon icon="brightness-alt-high"></b-icon>
          Temperature : {{meteo._temperature}}°C
        </p>
        <p class="h5 mb-2">
          <b-icon icon="house-fill"></b-icon>
          Ville : {{meteo._city}}
        </p>
        <p class="h5 mb-2">
          <b-icon icon="droplet-half"></b-icon>
          Humidité : {{meteo._humidity}}%
        </p>
        <p class="h5 mb-2">
          <b-icon icon="arrows-collapse"></b-icon>
          Pression : {{meteo._pressure}} in
        </p>
        <p class="h5 mb-2">
          <b-icon icon="brightness-alt-low"></b-icon>
          Temperature minimun : {{meteo._temperatureMin}}°C
        </p>
        <p class="h5 mb-2">
          <b-icon icon="brightness-alt-high-fill"></b-icon>
          Temperature maximale : {{meteo._temperatureMax}}°C
        </p>
        <p class="h5 mb-2">
          <b-icon icon="info-circle-fill"></b-icon>
          Description : {{meteo._description}}
        </p>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
      meteo: {
        _latitude: "",
        _longitude: "",
        _city: "",
        _humidity: "",
        _pressure: "",
        _temperature: "",
        _temperatureMin: "",
        _temperatureMax: "",
        _description: ""
      },
      message: ""
    };
  },
  created() {},
  methods: {
    getMeteo() {
      if (
        this.meteo._latitude.replace(/\s/g, "") == "" ||
        this.meteo._longitude.replace(/\s/g, "") == ""
      ) {
        this.message = "Il faut remplir tous les champs";
      } else {
        const apiKey = "0983694babdaf2a6579ab01bd868bca0";
        this.axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${this.meteo._latitude}&lon=${this.meteo._longitude}&appid=${apiKey}`
          )
          .then(res => {
            console.log(res.data);
            this.meteo._city = res.data.name;
            this.meteo._humidity = res.data.main.humidity;
            this.meteo._pressure = res.data.main.pressure;
            this.meteo._temperature = (res.data.main.temp - 273.15).toFixed();
            this.meteo._temperatureMin = (
              res.data.main.temp_min - 273.15
            ).toFixed();
            this.meteo._temperatureMax = (
              res.data.main.temp_max - 273.15
            ).toFixed();
            this.meteo._description = res.data.weather[0].description;
          })
          .catch(error => {
            console.log("ERROR : ", error.response);
          });
      }
    }
  }
};
</script>

<style>
</style>