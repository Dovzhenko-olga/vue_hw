<template>
  <div>
    {{data.name}}
    <button @click="$emit('delete')">Видалити</button>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete'])

</script>

<style scoped>
div{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>