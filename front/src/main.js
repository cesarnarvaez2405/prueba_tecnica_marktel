import { createApp } from "vue";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import es from "@vee-validate/i18n/dist/locale/es.json";

import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";

import "./style.css";
import "./utils/rulesVeeValidation";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

configure({
  generateMessage: localize({
    es,
  }),
  validateOnInput: true,
});

app.use(router);

app.mount("#app");
