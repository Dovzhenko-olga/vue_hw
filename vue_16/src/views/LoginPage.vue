<template>
  <header-component />
  <div>
    <h1>{{ $t('actionTitles.loginTitle') }}</h1>
    <button @click="onLogin">{{ $t('actionTitles.login') }}</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  name: 'LoginPage',
  components: {
    HeaderComponent,
  },
  methods: {
    ...mapActions('auth', ['loginWithGoogle']),
    async onLogin() {
      try {
        await this.loginWithGoogle()
        this.$router.push({
          name: 'home',
        })
      } catch (error) {
        alert(error.message)
      }
    },
  },
}
</script>
<style scoped>
button {
  padding: 5px;
}
</style>
