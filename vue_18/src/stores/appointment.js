import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppointmentsStore = defineStore
  ('appointments', () => {
    const appointments = ref([
      {
        id: 1,
        friend: 'Баба Галя',
        present: 'Торт',
      },
      {
        id: 2,
        friend: 'Дід Петро',
        present: 'Шовдарь',
      },
      {
        id: 3,
        friend: 'Онука Оленка',
        present: 'Листівка',
      },
    ])

    const getAppointments = computed(() => appointments.value)

    const addAppointment = (newItemData) => {
      appointments.value.push({
        id: new Date().getTime(),
        ...newItemData,
      })
    }

    const deleteAppointment = (idToDelete) => {

      appointments.value = appointments.value.filter(item =>
        item.id !== idToDelete)
    }

    return {
      appointments,
      getAppointments,
      addAppointment,
      deleteAppointment,
    }
  })