<template>
  <aside>
    <h2>{{ $t('menu.filter') }}</h2>
    <h3>{{ $t('menu.sellers') }}</h3>
    <div v-for="seller in sellers" :key="seller.id">
      <input
        required
        name="seller"
        type="checkbox"
        v-model="selectedSellers"
        :id="seller.id"
        :value="seller.id"
      />
      <label :for="seller.id"> {{ seller.title }} </label>
    </div>
    <h3>{{ $t('menu.brands') }}</h3>
    <div v-for="brand in brands" :key="brand.id">
      <input
        required
        name="brand"
        type="checkbox"
        v-model="selectedBrands"
        :id="brand.id"
        :value="brand.id"
      />
      <label :for="brand.id"> {{ brand.name }} </label>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FilterComponent',
  props: {
    sellers: {
      type: Array,
      default: () => [],
    },
    brands: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  computed: {
    selectedSellers: {
      get() {
        return this.modelValue.selectedSellers || []
      },
      set(newValue) {
        this.$emit('update:modelValue', { ...this.modelValue, selectedSellers: newValue })
      },
    },
    selectedBrands: {
      get() {
        return this.modelValue.selectedBrands || []
      },
      set(newValue) {
        this.$emit('update:modelValue', { ...this.modelValue, selectedBrands: newValue })
      },
    },
  },
}
</script>

<style scoped>
aside {
  padding: 10px;
  min-width: 250px;
}
h2 {
  font-size: 22px;
  font-weight: 700;
  text-decoration: underline;
}
h3 {
  font-size: 20px;
  font-weight: 600;
}
div {
  padding-inline: 5px;
}
input {
  margin-right: 10px;
}
</style>
