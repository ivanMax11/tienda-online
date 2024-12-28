import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importa Vuetify y estilos
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Configuración de Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#1976d2',
          secondary: '#1565c0',
          accent: '#82B1FF',
        },
      },
    },
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);

app.mount('#app');
