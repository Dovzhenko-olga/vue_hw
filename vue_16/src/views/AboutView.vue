<template>
  <main-layout :is-loading="isLoading" :has-error="hasError">
    <header-component />
    <div class="about">
      <h1>{{ $t('about.aboutTitle') }}</h1>
    </div>
  </main-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  components: {
    HeaderComponent,
  },
  computed: {
    ...mapGetters('products', ['isLoading', 'hasError']),
  },
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
