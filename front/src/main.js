import { createApp } from "vue";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import es from "@vee-validate/i18n/dist/locale/es.json";
import { createPinia } from "pinia";

import router from "./router/index";
import App from "./App.vue";

import "./style.css";
import "./utils/rulesVeeValidation";

const app = createApp(App);
const pinia = createPinia();

configure({
  generateMessage: localize({
    es,
  }),
  validateOnInput: true,
});

app.use(router);
app.use(pinia);

app.mount("#app");
