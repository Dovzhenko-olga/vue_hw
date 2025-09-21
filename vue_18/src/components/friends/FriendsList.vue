<template>
  <div>
    <ol>
      <li v-for="friend in getFriendsList" :key="friend.id">
        <friend-item :data="friend" @delete="onDelete(friend.id)"/>
      </li>
    </ol>
    <div class="adding">
      <label>Новий друг</label>
        <input type="text" v-model="data.name">
      <button @click="onAdd">Додати</button>
    </div>
  </div>
</template>

<script setup>
import  FriendItem  from "./FriendItem.vue"
import { useFriendsStore } from "@/stores/friends"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const friendsStore = useFriendsStore()
const { getFriendsList } = storeToRefs(friendsStore)
const { deleteFriend, addFriend, getFriendById } = friendsStore

import { useAppointmentsStore } from "@/stores/appointment"
const appointmentsStore = useAppointmentsStore()
const { getAppointments } = storeToRefs(appointmentsStore)
const { deleteAppointment } = appointmentsStore

const onDelete = (friendId) =>{
  const currentFriend = getFriendById(friendId)
  const currentAppointments = getAppointments.value.filter(item => item.friend === currentFriend.name)

  if(currentAppointments.length) {
    for( let i=0; i<currentAppointments.length; i++){
    deleteAppointment(currentAppointments[i].id)}
    }
  deleteFriend(friendId)
}

const data = ref({
  name: null,
})
const onAdd = () => {
  
  if(data.value.name){
    addFriend(data.value)
    data.value.name = null
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