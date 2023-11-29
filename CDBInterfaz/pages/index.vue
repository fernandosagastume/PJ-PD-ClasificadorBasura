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
              <v-card-text class="text-center">
                <v-img :src="imagePreview" :max-height="400" :max-width="400"
                       class="mx-auto my-auto" style="border-radius:15px;" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="12" lg="10" md="8" sm="12">
            <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6"
                    v-if="prediccion"
            >
              <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
                <v-spacer/>
                <h2> Instrucciones para el reciclaje </h2>
                <v-spacer/>
              </v-toolbar>
              <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
                <v-spacer/>
                <h4> Instrucciones para el reciclaje </h4>
                <v-spacer/>
              </v-toolbar>
              <v-card-text class="text-center">
                <div>
                  <v-list>
                    <v-list-item-group v-if="instrucciones.length > 0">
                      <v-list-item v-for="(instruccion, index) in instrucciones" :key="index">
                        <v-list-item-icon> <v-icon color="black">fa fa-arrow-right</v-icon> </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="text-wrap">{{ instruccion.title }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
              </v-card-text>
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
        instrucciones: [],
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

            if (data.prediccion === 'carton') {
              this.prediccion = 'cartón';
              this.instrucciones = [];
              this.instrucciones.push({ title: "Asegúrate de que el cartón esté limpio y sin residuos de comida.", value: 1 });
              this.instrucciones.push({ title: "Separa cualquier cinta adhesiva o etiquetas antes de reciclar.", value: 2 });
              this.instrucciones.push({ title: "Puedes reciclar cajas de cartón, envases y otros productos de cartón.", value: 3 });
            } else if (data.prediccion === 'plastico') {
              this.prediccion = 'plástico';
              this.instrucciones = [];
              this.instrucciones.push({ title: "Verifica los códigos de reciclaje en los envases de plástico (números del 1 al 7).", value: 1 });
              this.instrucciones.push({ title: "Enjuaga los envases de plástico y retira las tapas antes de reciclar.", value: 2 });
              this.instrucciones.push({ title: "Algunos plásticos, como las botellas de agua, son generalmente reciclables.", value: 3 });
            } else {
              this.prediccion = data.prediccion;
              if (data.prediccion === 'vidrio') {
                this.instrucciones = [];
                this.instrucciones.push({ title: "Limpia los envases de vidrio para eliminar cualquier residuo.", value: 1 });
                this.instrucciones.push({ title: "Separa el vidrio por colores: transparente, verde y ámbar.", value: 2 });
                this.instrucciones.push({ title: "Recicla botellas, frascos y otros envases de vidrio.", value: 3 });
              } else if (data.prediccion === 'metal') {
                this.instrucciones = [];
                this.instrucciones.push({ title: "Recicla latas de aluminio y acero.", value: 1 });
                this.instrucciones.push({ title: "Asegúrate de enjuagar los envases de metal para eliminar cualquier residuo.", value: 2 });
                this.instrucciones.push({ title: "Puedes reciclar latas de refrescos, latas de alimentos y otros productos de metal.", value: 3 });
              } else if (data.prediccion === 'papel') {
                this.instrucciones = [];
                this.instrucciones.push({ title: "Recicla papel limpio y seco.", value: 1 });
                this.instrucciones.push({ title: "Separa el papel por tipo: periódicos, revistas, cartón, etc.", value: 2 });
                this.instrucciones.push({ title: "Evita reciclar papel contaminado con alimentos o productos químicos.", value: 3 });
              } else if (data.prediccion === 'basura') {
                this.instrucciones = [];
                this.instrucciones.push({ title: "Intenta reducir la cantidad de residuos que generas.", value: 1 });
                this.instrucciones.push({ title: "Separa los residuos no reciclables de los reciclables.", value: 2 });
                this.instrucciones.push({ title: "Coloca los desechos no reciclables en bolsas adecuadas y asegúrate de que sean manejados correctamente.", value: 3 });
              }
            }

          }).catch(data => {
            console.error(data)
          })

        }

      }

    },


  }
</script>
