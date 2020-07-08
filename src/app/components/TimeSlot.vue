<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-7">
        <b-card bg-variant="light" style="height:100%">
          <b-form @submit.prevent="addTimeSlot" autocomplete="off">
            <p class="h2">Choissisez une maison :</p>
            <b-form-select v-model="selected" @change="getPanels_Targets">
              <b-form-select-option
                v-for="home of homes"
                :key="home._id"
                :value="home"
              >{{home.name}}</b-form-select-option>
            </b-form-select>
            <p>Maison : {{selected.name}}</p>
            <p>Rue : {{selected.street}}</p>
            <b-form-group label="Nom de la plage horaire:">
              <b-form-input v-model="timeslot.name"></b-form-input>
            </b-form-group>
            <div class="row">
              <div class="col-md-3">
                <b-form-group label="Date de début:">
                  <b-form-input v-model="timeslot.startdate" type="date"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group label="Date de fin:">
                  <b-form-input v-model="timeslot.enddate" type="date"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group label="Heure de début:">
                  <b-form-input v-model="timeslot.starttime" type="time"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group label="Heure de fin:">
                  <b-form-input v-model="timeslot.endtime" type="time"></b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <b-form-group>
                  <template v-slot:label>
                    <b>Choissisez les jours:</b>
                    <br />
                    <b-form-checkbox
                      v-model="allSelected"
                      :indeterminate="indeterminate"
                      aria-describedby="days"
                      aria-controls="days"
                      @change="toggleAll"
                    >{{ allSelected ? 'Tout déselectionner' : 'Sélectionner tout' }}</b-form-checkbox>
                  </template>

                  <b-form-checkbox-group
                    id="days"
                    v-model="selecteddays"
                    :options="days"
                    name="days"
                    class="ml-4"
                    aria-label="Individual days"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>

                <!--                 <div>
                  Selected:
                  <strong>{{ selecteddays }}</strong>
                  <br />All Selected:
                  <strong>{{ allSelected }}</strong>
                  <br />Indeterminate:
                  <strong>{{ indeterminate }}</strong>
                </div>-->
              </div>
              <div class="col-md-4">
                <b-form-group label="Panneau:">
                  <b-form-select v-model="selectedPanel">
                    <b-form-select-option
                      v-for="panel of panels"
                      :key="panel._id"
                      :value="panel"
                    >{{panel.name}}</b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group label="Cible:">
                  <b-form-select v-model="selectedTarget">
                    <b-form-select-option
                      v-for="target of targets"
                      :key="target._id"
                      :value="target"
                    >{{target.name}}</b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>
            </div>
            <b-form-group>
              <b-button
                block
                type="submit"
                variant="dark"
                style="right"
              >Enregistrer la plage horaire</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
      <!-- Card pour afficher les données -->
      <div class="col-md-5">
        <b-card header-tag="header" footer-tag="footer">
          <template v-slot:header>
            <h6 class="mb-0">Plage horaire</h6>
          </template>
          <b-card-title>Titre: {{timeslot.name}}</b-card-title>
          <b-card-text>Panneau: {{selectedPanel.name}}</b-card-text>
          <b-card-text>Cible: {{selectedTarget.name}}</b-card-text>
          <b-card-text>Date de début : {{timeslot.startdate}}</b-card-text>
          <b-card-text>Date de fin : {{timeslot.enddate}}</b-card-text>
          <b-card-text>Heure de début : {{timeslot.starttime}}</b-card-text>
          <b-card-text>Heure de fin : {{timeslot.endtime}}</b-card-text>
          <b-card-text>Jours : {{selecteddays}}</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
          <template v-slot:footer>
            <em>Created : {{creationdate}}</em>
          </template>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
class TimeSlot {
  constructor(
    _name,
    startdate,
    enddate,
    starttime,
    endtime,
    days,
    panel,
    target
  ) {
    this.name = _name;
    this.startdate = startdate;
    this.enddate = enddate;
    this.starttime = starttime;
    this.endtime = endtime;
    this.days = days;
    this.idpanel = panel;
    this.idtarget = target;
  }
}
export default {
  name: "TimeSlot",
  data() {
    return {
      timeslot: new TimeSlot(),
      idUser: "",
      homes: [],
      panels: [],
      targets: [],
      selected: "",
      selectedPanel: "",
      selectedTarget: "",
      creationdate: "",
      /* jours */
      days: [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
      ],
      selecteddays: [],
      allSelected: false,
      indeterminate: false
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
          console.log("ERREUR :", error.response);
        });
    },
    getPanels_Targets() {
      this.axios
        .get(`/timeslot/panel/target/${this.selected._id}`)
        .then(res => {
          this.panels = res.data.home.panels;
          this.targets = res.data.home.targets;
        })
        .catch(error => {
          console.log("ERREUR :", error);
        });
    },
    addTimeSlot() {
      this.timeslot.days = this.selecteddays;
      this.timeslot.idpanel = this.selectedPanel._id;
      this.timeslot.idtarget = this.selectedTarget._id;
      this.axios
        .post(`/timeslot/${this.selected._id}`, this.timeslot)
        .then(res => {
          console.log(res.data);
          this.creationdate = new Date();
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    toggleAll(checked) {
      this.selecteddays = checked ? this.days.slice() : [];
    }
  },
  watch: {
    selecteddays(newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newVal.length === this.days.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    }
  }
};
</script>

<style>
</style>