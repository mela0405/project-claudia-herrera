// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'claudiaTheme',
    themes: {
      claudiaTheme: {
        dark: false,
        colors: {
          background: '#FFD1DC',     // rosado pastel
          primary: '#FF69B4',        // rosado fuerte
          secondary: '#000000',      // negro
          accent: '#00BFFF',         // azul de los botones "+"
          text: '#333333',
        },
      },
    },
  },
})
