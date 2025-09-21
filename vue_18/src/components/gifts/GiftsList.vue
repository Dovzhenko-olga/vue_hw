<template>
  <div>
    <ol>
      <li v-for="gift in getGiftsList" :key="gift.id">
        <gift-item :data="gift" @delete="onDelete(gift.id)"/>
      </li>
    </ol>
    <div class="adding">
      <label>Новий подарунок</label>
        <input type="text" v-model="data.title">
      <button @click="onAdd">Додати</button>
    </div>
  </div>
</template>

<script setup>
import  GiftItem  from "./GiftItem.vue"
import { useGiftsStore } from "@/stores/gifts"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const giftsStore = useGiftsStore()
const { getGiftsList } = storeToRefs(giftsStore)
const { deleteGift, addGift, getGiftById } = giftsStore

import { useAppointmentsStore } from "@/stores/appointment"
const appointmentsStore = useAppointmentsStore()
const { getAppointments } = storeToRefs(appointmentsStore)
const { deleteAppointment } = appointmentsStore

const onDelete = (giftId) => {
  const currentGift = getGiftById(giftId)
  const currentAppointments = getAppointments.value.filter(item => item.present === currentGift.title )
  
  if(currentAppointments.length) {
    for( let i=0; i<currentAppointments.length; i++){
    deleteAppointment(currentAppointments[i].id)}
    }
  deleteGift(giftId)
}

const data = ref({
  title: null,
})
const onAdd = () => {
  
  if(data.value.title){
    addGift(data.value)
    data.value.title = null
  }
}

</script>

<style scoped>
ol{
  padding-left: 25px;
}
li{
  width: 250px;
  margin-bottom: 15px;
}
.adding{
  display: flex;
  gap: 25px;
}

</style>