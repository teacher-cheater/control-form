import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from "./App.vue";
// import router from './router'
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// app.use(router)
app.use(pinia)
app.use(vuetify);

app.mount("#app");
