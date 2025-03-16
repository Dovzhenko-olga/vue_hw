<template>
  <main-layout :is-loading="isLoading" :has-error="hasError">
    <slot></slot>
  </main-layout>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'BusesLayout',
  computed: {
  ...mapGetters('buses', ['isLoading', 'hasError']),
  },
}
</script>

<style lang="scss" scoped></style>