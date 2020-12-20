import Vue from 'vue'

class AuthService {
  constructor(store) {
    this.$store = store
  }

  get isAuthenticated(){
    return this.$store.state.isAuthenticated
  }
  get user(){
    return this.$store.state.user
  }
}

export  default  async  ({store})=>{
  const authService = new AuthService(store)
  Vue.prototype.$auth = authService
  Vue.$auth = authService
  await store.dispatch('auth/isAuthenticated')
}
