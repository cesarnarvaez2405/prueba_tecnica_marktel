import { createApp } from "vue";

import router from "./router/index";
import "./style.css";
import App from "./App.vue";

// Importar vee-validate y configuración de reglas
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import es from "@vee-validate/i18n/dist/locale/es.json";

// Importar las reglas definidas
import "./utils/rulesVeeValidation";

const app = createApp(App);

configure({
  generateMessage: localize({
    es,
  }),
  validateOnInput: true,
});

app.use(router);
app.mount("#app");
