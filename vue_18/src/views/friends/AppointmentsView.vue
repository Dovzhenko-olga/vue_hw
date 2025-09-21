<template>
  <div>
    <h1>Розподіл подарунків</h1>
    <ul class="list">
      <li v-for="appointment in getAppointments" :key="appointment.id">
        {{appointment.friend}} - {{appointment.present}}
        <button @click="onDelete(appointment.id)">Видалити</button>
      </li>
    </ul>
    <hr>
     <div class="appointment">
       <label>Друг <br>
          <select v-model="selectData.friend" name="friend">
            <option value="" class="notValid">Оберіть друга</option>
            <option v-for="friend in getFriendsList" :key="friend.id" :value="friend.name">
              {{ friend.name }}
            </option>
          </select>
       </label>
       <label>Подарунок <br>
          <select v-model="selectData.present" name="present">
            <option value="" class="notValid">Оберіть подарунок</option>
            <option v-for="present in getGiftsList" :key="present.id" :value="present.title">
              {{ present.title }}
            </option>
          </select>
       </label>
          <button @click="onAdd">Додати</button>
     </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { reactive } from "vue"
import { useAppointmentsStore } from "@/stores/appointment"

const appointmentsStore = useAppointmentsStore()
const { getAppointments } = storeToRefs(appointmentsStore)
const { deleteAppointment, addAppointment } = appointmentsStore

const onDelete = (id) =>{
  deleteAppointment(id)
}

let selectData = reactive( {
  friend: '',
  present: '',
})

import { useFriendsStore } from "@/stores/friends"
const friendsStore = useFriendsStore()
import { useGiftsStore } from "@/stores/gifts"
const giftsStore = useGiftsStore()
const { getGiftsList } = storeToRefs(giftsStore)
const { getFriendsList } = storeToRefs(friendsStore)

const onAdd = ()=>{
  if( selectData.friend && selectData.present){
  addAppointment(selectData)
    selectData = {
    friend: '',
    present: '',
  }
  }
}

</script>

<style>
.list{
  list-style: none;
  padding-left: 0;
}
li{
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.appointment{
  display: flex;
  gap: 25px;
  align-items: end;
  padding-block: 30px;
}
input,
select {
  padding: 5px;
  min-width: 200px;
}
select {
  font-family: inherit;
  font-size: inherit;
}
.notValid {
  color: #999;
}
select:valid {
  color: #1a1a1a;
}
button {
  cursor: pointer;
  padding: 5px;
}
</style>
