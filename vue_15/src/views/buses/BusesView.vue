<template>
<h2>Наші автобуси</h2>
  <buses-layout>
    <div v-for="item in getItemsList" :key="item.id" class="d-flex">
      <div>
          {{ item.number }} - {{ item.seats }} місць
      </div>
      <div>
        <v-btn density="compact" icon="mdi-pencil" @click="editItem(item.id)" class="btn-icon"></v-btn>
        <v-btn density="compact" icon="mdi-delete" @click="deleteItem(item.id)" class="btn-icon"></v-btn>
      </div>
    </div>
    <hr />
    <router-link
      :to="{
      name: 'bus-edit',}">
      <v-btn variant="elevated" class="add-button">
        Додати автобус
      </v-btn>
    </router-link>
  </buses-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "BusesView",
    computed: {
  ...mapGetters('buses', ['getItemsList']),
  },
  methods: {
    ...mapActions('buses', [
      'loadList',
      'deleteItem',
      ]),
    editItem(id){
      this.$router.push({
        name: 'bus-edit',
        params: {id}
      })
    }
  },
  created() {
    this.loadList()
  },
  }
</script>

<style lang="scss" scoped>
  .d-flex {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin-bottom: 5px;
    .btn-icon{
      margin-right: 5px;
      color: #00bd7ea6;
      :hover {
        color: #00bd7e;
      }
    }
  }
  a:hover {
    background-color: transparent;
  }
  .add-button{
    color: #00bd7e;
    border: 1px solid #00bd7e;
    background-color: #00bd7e23;
  }
</style>