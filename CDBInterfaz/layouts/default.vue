<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
      color="primary"
      :width="($vuetify.breakpoint.name === 'sm' ||
      $vuetify.breakpoint.name === 'xs') ? 250 : 350"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark color="primary" elevation="0"
               :clipped-left="clipped" fixed app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="hidden-sm-and-down">
        <h4>{{$store.state.nombreRuta}}</h4>
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
        },
        {
          icon: 'fa fa-recycle',
          title: 'Acerca del Reciclaje',
          to: '/reciclaje'
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
