export const state = () => ({
  loading: false,
  rutas: [],
  RutaNoPermitida: false,
  nombreRuta: "",
  usuarioAuth: {}
})

export const mutations = {
  setLoading(state, value){
    state.loading = value
  },
  setRutas(state, value){
    state.rutas = value
  },
  setRutaNoPermitida(state, value){
    state.RutaNoPermitida = value
  },
  setNombreRuta(state, value){
    state.nombreRuta = value
  },
  setUsuarioAuth(state, value){
    state.usuarioAuth = value
  }
}
