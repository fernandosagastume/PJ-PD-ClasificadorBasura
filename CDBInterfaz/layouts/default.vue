<template>
  <v-app dark>
    <v-app-bar dark color="primary" elevation="0"
               :clipped-left="clipped" fixed app
    >
      <v-toolbar-title class="hidden-sm-and-down">
        <h3>{{$store.state.nombreRuta}}</h3>
      </v-toolbar-title>
      <v-toolbar-title class="hidden-md-and-up">
        <h5>{{$store.state.nombreRuta}}</h5>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer class="justify-center white--text" :absolute="fixed">
      <div class="hidden-sm-and-down">
        Copyright &copy; {{ new Date().getFullYear() }}
      </div>
      <div class="hidden-md-and-up" style="font-size: 14px;">
        <span>
          Copyright &copy; {{ new Date().getFullYear() }}
        </span>
      </div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'fa fa-code-branch',
          title: 'Clasificador de Basura',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
