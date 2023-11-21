export default ({ app, store, $axios }, inject) => {
  const processRequest = (promise, resolve, reject) => {
    promise.then(res => {
      store.commit('setLoading',false)
      if (resolve)
        resolve(res.data)
    }).catch(res => {
      store.commit('setLoading',false)
      if (reject && res.response.status === 400)
        reject(res.response.data)
    })
  }

  const api = {
    timeout: 5000,
    outboxing: false,
    normalGet (URL, params = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          params: params,
          timeout: this.timeout
        }
        processRequest($axios.get(URL, config),resolve,reject)
      })
    },
    get (service, params = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          params: params,
          withCredentials: true,
          timeout: this.timeout
        }
        processRequest($axios.get(process.env.API + service, config),resolve,reject)
      })
    },
    post (service, params = {}, files = false){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          withCredentials: true,
          timeout: this.timeout,
        }
        if (files){
          config.headers = { 'content-type': 'multipart/form-data' }
        }
        processRequest($axios.post(process.env.API + service,params, config),resolve,reject)
      })
    },
    postFiles(service, params = {}, files = false) {
      store.commit('setLoading', true);

      return new Promise((resolve, reject) => {
        let config = {
          withCredentials: true,
          timeout: this.timeout,
          headers: { 'content-type': 'multipart/form-data' }
        };

        // Si se están enviando archivos (imágenes u otros), utiliza FormData
        if (files) {
          const formData = new FormData();

          // Agrega los parámetros al FormData
          Object.keys(params).forEach((key) => {
            formData.append(key, params[key]);
          });

          // Agrega los archivos al FormData
          Object.keys(files).forEach((key) => {
            formData.append(key, files[key]);
          });

          processRequest($axios.post(process.env.API + service, formData, config), resolve, reject);
        }
      });
    },
    put (service, params = {}) {
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          withCredentials: true,
          timeout: this.timeout,
        }
        processRequest($axios.put(process.env.API + service,params,config),resolve,reject)
      })
    },
    patch (service, params = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          withCredentials: true,
          timeout: this.timeout,
        }
        processRequest($axios.patch(process.env.API + service,params,config),resolve,reject)
      })
    },
    delete (service, params = {}){
      store.commit('setLoading',true)
      return new Promise((resolve, reject) => {
        let config = {
          withCredentials: true,
          timeout: this.timeout,
          params: params,
        }
        processRequest($axios.delete(process.env.API + service,config),resolve,reject)
      })
    }
  }

  inject('api', api)
}
