<template>
  <div v-if="isLoading">Loading ....</div>
  <div v-else-if="hasError">Error</div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.loginWithCredential()
  },
  methods: {
    ...mapActions('auth', ['loginWithCredential']),
  },
}
</script>
<style></style>
