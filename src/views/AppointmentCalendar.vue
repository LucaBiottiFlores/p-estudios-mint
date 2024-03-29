<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="80">
          <v-toolbar flat color="white">
            <!-- Botón Agregar Evento Starts -->
            <v-btn color="secondary" dark class="mr-4" @click="dialog = true">
              Reservar Horas
            </v-btn>
            <!-- Botón Agregar Evento Ends -->
            <v-btn outlined class="mr-4" @click="setToday"> Hoy </v-btn>
            <v-btn fab text small @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn outlined v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Día</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="secondary"
            :events="events"
            :event-color="getEventColor"
            :event-margin-bottom="3"
            :now="today"
            :type="type"
            :dark="false"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            locale="es"
            :short-weekdays="false"
            :first-interval="9"
            :interval-minutes="60"
            :interval-count="12"
          ></v-calendar>

          <!-- Modal Agregar Evento -->
          <v-dialog v-model="dialog" max-width="700">
            <v-card>
              <v-card-title>
                <span class="text-h5 mt-5">Reserva tu Sala</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent="addEvent">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          type="text"
                          label="Nombre / Banda"
                          v-model="name"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="text"
                          label="Agregar un Detalle"
                          v-model="details"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field
                          type="date"
                          label="Inicio del evento"
                          v-model="startDate"
                          @change="onDateChange"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-select
                          v-model="startTime"
                          item-text="text"
                          item-value="value"
                          :items="startHoursAvailable"
                          label="Inicio"
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-select
                          v-model="endTime"
                          item-text="text"
                          item-value="value"
                          :items="endHoursAvailable"
                          label="Término"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-swatches
                          v-model="color"
                          :swatches="swatches"
                          row-length="6"
                          shapes="circles"
                          popover-x="left"
                        ></v-swatches>
                      </v-col>
                      <v-card-text>
                        <div v-if="this.name && this.startTime && this.endTime">
                          <span class="appointment-total mt-5">
                            Horas:

                            {{ endTime - startTime }}

                            <br />
                            Total:
                            <v-chip color="teal accent-2">
                              ${{
                                parseInt(
                                  (endTime - startTime) * 20000
                                ).toLocaleString("de-DE")
                              }}
                            </v-chip>
                          </span>
                        </div>
                        <div v-else>
                          <span class="appointment-total mt-5"> </span>
                        </div>
                      </v-card-text>
                    </v-row>
                    <v-card-actions class="mt-8 d-flex flex-row-reverse">
                      <div class="d-flex flex-row">
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          type="submit"
                          color="secondary"
                          class="mr-4"
                          @click.stop="dialog = false"
                          >Reservar Sala</v-btn
                        >
                      </div>
                    </v-card-actions>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn
                  icon
                  @click="deleteEvent(selectedEvent)"
                  v-if="$store.state.sesion.user"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text>
                <v-form v-if="currentlyEditing !== selectedEvent.id">
                  <p>Nombre: {{ selectedEvent.name }}</p>
                  <p>Detalle: {{ selectedEvent.details }}</p>
                  <p>
                    Hora: {{ selectedEvent.startTime }} -
                    {{ selectedEvent.endTime }}
                  </p>
                </v-form>

                <v-form v-else>
                  <v-text-field
                    type="date"
                    v-model="selectedEvent.startDate"
                    label="Editar Fecha"
                  >
                  </v-text-field>

                  <v-select
                    v-model="selectedEvent.startTime"
                    item-text="text"
                    :items="filteredDataEditStartTime"
                    label="Hora de Inicio"
                    required
                  >
                  </v-select>

                  <v-select
                    v-model="selectedEvent.endTime"
                    item-text="text"
                    :items="filteredDataEditEndTime"
                    label="Hora de Término"
                    required
                  >
                  </v-select>

                  <v-text-field
                    type="text"
                    v-model="selectedEvent.name"
                    label="Editar Nombre"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="selectedEvent.details"
                    type="text"
                    :min-height="100"
                    label="Editar Detalle"
                  ></v-text-field>
                  <v-swatches
                    v-model="selectedEvent.color"
                    :swatches="swatches"
                    row-length="6"
                    shapes="circles"
                    popover-x="right"
                  ></v-swatches>
                  {{ selectedEvent.startTime }}
                  {{ selectedEvent.startDate }}
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancelar
                </v-btn>
                <v-btn
                  text
                  v-if="currentlyEditing !== selectedEvent.id"
                  @click.prevent="editEvent(selectedEvent.id)"
                  v-show="$store.state.sesion.user"
                  >Editar</v-btn
                >

                <v-btn text v-else @click.prevent="updateEvent(selectedEvent)"
                  >Guardar Cambios</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Firebase from "firebase";
import VSwatches from "vue-swatches";

export default {
  components: { VSwatches },

  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
    },
    startDate: null,
    startTime: null,
    endTime: null,
    start: null,
    end: null,
    duration: null,
    startTimeHour: null,
    endTimeHour: null,
    startHours: [
      { text: "09:00", value: 9 },
      { text: "10:00", value: 10 },
      { text: "11:00", value: 11 },
      { text: "12:00", value: 12 },
      { text: "13:00", value: 13 },
      { text: "14:00", value: 14 },
      { text: "15:00", value: 15 },
      { text: "16:00", value: 16 },
      { text: "17:00", value: 17 },
      { text: "18:00", value: 18 },
      { text: "19:00", value: 19 },
      { text: "20:00", value: 20 },
    ],
    endHours: [
      { text: "10:00", value: 10 },
      { text: "11:00", value: 11 },
      { text: "12:00", value: 12 },
      { text: "13:00", value: 13 },
      { text: "14:00", value: 14 },
      { text: "15:00", value: 15 },
      { text: "16:00", value: 16 },
      { text: "17:00", value: 17 },
      { text: "18:00", value: 18 },
      { text: "19:00", value: 19 },
      { text: "20:00", value: 20 },
      { text: "21:00", value: 21 },
    ],
    startHoursAvailable: [
      { text: "09:00", value: 9 },
      { text: "10:00", value: 10 },
      { text: "11:00", value: 11 },
      { text: "12:00", value: 12 },
      { text: "13:00", value: 13 },
      { text: "14:00", value: 14 },
      { text: "15:00", value: 15 },
      { text: "16:00", value: 16 },
      { text: "17:00", value: 17 },
      { text: "18:00", value: 18 },
      { text: "19:00", value: 19 },
      { text: "20:00", value: 20 },
    ],
    endHoursAvailable: [
      { text: "10:00", value: 10 },
      { text: "11:00", value: 11 },
      { text: "12:00", value: 12 },
      { text: "13:00", value: 13 },
      { text: "14:00", value: 14 },
      { text: "15:00", value: 15 },
      { text: "16:00", value: 16 },
      { text: "17:00", value: 17 },
      { text: "18:00", value: 18 },
      { text: "19:00", value: 19 },
      { text: "20:00", value: 20 },
      { text: "21:00", value: 21 },
    ],
    swatches: [
      "#1fbc9c",
      "#2ecc70",
      "#3398db",
      "#a463bf",
      "#f2c511",
      "#e84b3c",
    ],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    name: null,
    details: null,
    color: "#1fbc9c",
    dialog: false,
    currentlyEditing: null,
  }),
  computed: {
    filteredDataStartDateEvents() {
      return this.events.filter((date) =>
        date.startDate.includes(this.startDate)
      );
    },

    filteredDataEndTime() {
      const selectedEndTimeHours = this.events.map((event) => {
        return {
          eventEndTimeHour: event.endTimeHour,
          eventStartDate: event.startDate,
        };
      });
      console.log(selectedEndTimeHours);

      const filteredSelectedEndTimeHours = selectedEndTimeHours.filter(
        (date) => date.eventStartDate === this.startDate
      );
      console.log(filteredSelectedEndTimeHours);

      const numberFilteredSelectedEndTimeHours =
        filteredSelectedEndTimeHours.map((hour) => hour.eventEndTimeHour);

      console.log(numberFilteredSelectedEndTimeHours);

      const maxFilteredSelectedEndTimeHours = Math.max(
        ...numberFilteredSelectedEndTimeHours
      );
      console.log(maxFilteredSelectedEndTimeHours);

      return this.endHours
        .filter((endHour) => endHour.value > this.startTime)
        .filter((endHour) => {
          if (
            this.filteredDataStartDateEvents.length > 0 &&
            this.startTime < maxFilteredSelectedEndTimeHours
          ) {
            return this.filteredDataStartDateEvents.some((event) => {
              return (
                endHour.value >= event.startTimeHour &&
                endHour.value < event.endTimeHour
              );
            });
          } else {
            return true;
          }
        });
    },

    filteredDataStartTime() {
      return this.startHours.filter((startHour) => {
        return !this.filteredDataStartDateEvents.some((event) => {
          return (
            startHour.value >= event.startTimeHour &&
            startHour.value < event.endTimeHour
          );
        });
      });
    },

    filteredDataStartDateEditEvents() {
      return this.events.filter((date) =>
        date.startDate.includes(this.selectedEvent.startDate)
      );
    },

    filteredDataEditEndTime() {
      return this.endHours
        .filter((endHour) => endHour.value > this.selectedEvent.startTime)
        .filter((endHour) => {
          if (this.filteredDataStartDateEditEvents.length > 0) {
            return this.filteredDataStartDateEditEvents.some((event) => {
              return endHour.value >= event.startTimeHour;
            });
          } else {
            return true;
          }
        });
    },

    filteredDataEditStartTime() {
      return this.startHours.filter((startHour) => {
        return !this.filteredDataStartDateEditEvents.some((event) => {
          return (
            startHour.value >= event.startTimeHour &&
            startHour.value < event.endTimeHour
          );
        });
      });
    },

    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  created() {
    this.getEvents();
  },
  methods: {
    checkBusyHours(i, d) {
      if (
        i.value >= d.data().startTimeHour - 1 &&
        i.value <= d.data().startTimeHour - 1 + d.data().duration
      ) {
        return true;
      }
    },
    onDateChange() {
      const startDateRef = Firebase.firestore().collection("appointments");
      const query = startDateRef
        .where("startDate", "==", this.startDate)
        .get()
        .then((querySnapshot) => {
          this.startHoursAvailable = this.startHours;
          this.endHoursAvailable = this.endHours;
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // set available times
            this.startHoursAvailable = this.startHoursAvailable.filter(
              (i) => !this.checkBusyHours(i, doc)
            );
            this.endHoursAvailable = this.endHoursAvailable.filter(
              (i) => !this.checkBusyHours(i, doc)
            );
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      return query;
    },
    async updateEvent(event) {
      try {
        await Firebase.firestore()
          .collection("appointments")
          .doc(event.id)
          .update({
            name: event.name,
            details: event.details,
            color: event.color,
            startDate: event.startDate,
            startTime: `${event.startTime}:00`,
            endTime: `${event.endTime}:00`,
            start: `${event.startDate} ${event.startTime}:00`,
            end: `${event.startDate} ${event.endTime}:00`,
            duration: event.endTime - event.startTime,
            startTimeHour: event.startTime,
            endTimeHour: event.endTime,
          });
        this.getEvents();
        this.selectedOpen = false;
        this.currentlyEditing = null;
      } catch (error) {
        console.log(error);
      }
    },
    editEvent(id) {
      this.currentlyEditing = id;
    },
    async deleteEvent(event) {
      try {
        await Firebase.firestore()
          .collection("appointments")
          .doc(event.id)
          .delete();
        this.selectedOpen = false;
        this.getEvents();
      } catch (error) {
        console.log(error);
      }
    },
    async addEvent() {
      try {
        if (this.name && this.startTime && this.endTime) {
          await Firebase.firestore()
            .collection("appointments")
            .add({
              name: this.name,
              details: this.details,
              start: `${this.startDate} ${this.startTime}:00`,
              end: `${this.startDate} ${this.endTime}:00`,
              color: this.color,
              duration: this.endTime - this.startTime,
              startTime: `${this.startTime}:00`,
              endTime: `${this.endTime}:00`,
              startDate: this.startDate,
              startTimeHour: this.startTime,
              endTimeHour: this.endTime,
            });
          this.getEvents();
          console.log(this.startDate);
          this.name = null;
          this.details = null;
          this.startDate = null;
          this.startTime = null;
          this.endTime = null;
          this.start = null;
          this.end = null;
          this.duration = null;
          this.color = "#1fbc9c";
        } else {
          console.log("Campos obligatorios");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getEvents() {
      try {
        const snapshot = await Firebase.firestore()
          .collection("appointments")
          .get();
        const events = [];

        snapshot.forEach((document) => {
          let eventData = document.data();
          eventData.id = document.id;
          events.push(eventData);
        });

        this.events = events;
        console.log(events);
      } catch (error) {
        console.log(error);
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
  },
};
</script>

<style scoped>
.appointment-total {
  font-size: 19px;
  color: #43444d;
  line-height: 35px;
}
</style>
