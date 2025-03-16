<template>
  <main-layout :is-loading="isLoading" :has-error="hasError">
    <slot></slot>
  </main-layout>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'DriversLayout',
  computed: {
  ...mapGetters('drivers', ['isLoading', 'hasError']),
  },
}
</script>

<style lang="scss" scoped></style>