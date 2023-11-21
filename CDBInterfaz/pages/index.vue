<template>
  <v-row justify="center" align="center">
    <v-col cols="12" lg="8" sm="8" md="10">
      <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">
        <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
          <v-spacer/>
          <h2> Ingresa una imagen </h2>
          <v-spacer/>
        </v-toolbar>

        <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
          <v-spacer/>
          <h4> Ingresa una imagen </h4>
          <v-spacer/>
        </v-toolbar>

        <v-card-text class="pa-6">

          <v-form ref="frmReciclar">

            <v-file-input
              v-model="basura"
              @change="image_preview"
              :rules="[rules.imagen.required]"
              accept="image/*"
              placeholder="Basura a clasificar"
              label="Basura a clasificar"
              outlined
              style="border-radius:10px;"
            />

            <div class="text-center d-flex justify-center">

              <v-btn
                color="primary"
                light
                class="mt-2 hidden-sm-and-down"
                style="border-radius:7px;"
                elevation="0"
                x-large
                @click="Reciclar"
                :disabled="!basura"
                :loading="$store.state.loading"
              >
                <v-icon left color="white" size="30" class="pr-3">
                  fa fa-recycle
                </v-icon>
                <div class="white--text">RECLICLAR</div>
              </v-btn>

              <v-btn
                color="primary"
                light
                class="pa-5 hidden-md-and-up"
                style="border-radius:7px;"
                elevation="0"
                @click="Reciclar"
                :disabled="!basura"
                :loading="$store.state.loading"
              >
                <v-icon left color="white" size="30" class="pr-3">
                  fa fa-recycle
                </v-icon>
                <div class="white--text">RECLICLAR</div>
              </v-btn>

            </div>

          </v-form>

        </v-card-text>

        <v-row justify="center" align="center">
          <v-col cols="12" lg="10" md="8" sm="12">
            <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6"
                    v-if="imagePreview"
            >
              <v-img :src="imagePreview" />
              <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down" v-if="prediccion">
                <v-spacer/>
                <h2> Este objeto debe reciclarse como: {{ this.prediccion }} </h2>
                <v-spacer/>
              </v-toolbar>

              <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up" v-if="prediccion">
                <v-spacer/>
                <h4> Este objeto debe reciclarse como: {{ this.prediccion }} </h4>
                <v-spacer/>
              </v-toolbar>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {

    mounted(){
      this.$store.commit('setNombreRuta', "Clasificador de Basura")
    },

    data(){
      return{
        basura: null,
        imagePreview: null,
        prediccion: null,
        error: null,
        rules: {
          imagen:{
            required: value => !!value || 'La imagen es obligatoria'
          }
        }

      }
    },

    methods: {
      image_preview() {
        this.prediccion = null
        if (this.basura) {
          this.imagePreview = URL.createObjectURL(this.basura)
        } else {
          this.imagePreview = null
        }
      },


      async Reciclar() {

        if (this.$refs.frmReciclar.validate()) {

          let params = {
            basura: this.basura
          }

          await this.$api.postFiles("", params, true).then(data => {

            if(data.prediccion === 'carton'){
              this.prediccion = 'cartón'
            }
            else if(data.prediccion === 'plastico'){
              this.prediccion = 'plástico'
            }
            else{
              this.prediccion = data.prediccion
            }

          }).catch(data => {
            console.error(data)
          })

        }

      }

    },


  }
</script>
