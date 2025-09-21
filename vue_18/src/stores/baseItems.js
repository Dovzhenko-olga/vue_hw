import { computed, ref } from "vue"

export const useBaseItems = (entityTitle, initialData) => {
  const items = ref(initialData)

  const getItems = computed(() => items.value)

  const getItemById = (prodId) =>
    items.value.find(item => item.id == prodId)

  const addItem = (newItemData) => {

    items.value.push({
      id: new Date().getTime(),
      ...newItemData,
    })
  }

  const deleteItem = (itemId) => {

    items.value = items.value.filter((item) => item.id !== itemId)
  }

  const entityEndings = entityTitle[0].toUpperCase() + entityTitle.slice(1)
  return {
    [entityTitle + 's']: items,
    ['get' + entityEndings + 'sList']: getItems,
    ['get' + entityEndings + 'ById']: getItemById,
    ['add' + entityEndings]: addItem,
    ['delete' + entityEndings]: deleteItem
  }
}
