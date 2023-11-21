import colors from 'vuetify/es5/util/colors'

export default {

  ssr: false,
  target: 'static',


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Interfaz Clasificador de Basura',
    title: 'CDBInterfaz',
    htmlAttrs: { lang: 'es' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    script: [
      { src: "https://kit.fontawesome.com/f968821922.js", crossOrigin: "anonymous"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/api.js', mode: 'client' }
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { filename: '.env.' + process.env.ENV }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: '0f2035',
          secondary: 'E1AF73',
          lightTitle: 'FFFFFF',
          contrasteAzul: '4183D7',
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green,
        },

      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
