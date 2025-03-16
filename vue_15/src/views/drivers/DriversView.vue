<template>
  <div class="d-flex">
    <div class="search-section">
      <div class="search">
      <label>
        Пошук за ім'ям
        <input type="text" v-model.lazy="queryOptData.driverName" class="input-field" />
      </label>
    </div>
    <div class="experience">
      <span>Стаж </span>
      <label>
         від 
        <input type="number" v-model.lazy="queryOptData.driverExpFrom" class="input-field experience-input" />
      </label>
      <label>
         до 
        <input type="number" v-model.lazy="queryOptData.driverExpTo" class="input-field experience-input" />
      </label>
    </div>
    <div class="sort">
      <label>
        Сортувати за стажем
        <select v-model="queryOptData.orderType" class="input-field">
          <option value="asc">За зростанням</option>
          <option value="desc">За спаданянм</option>
        </select>
      </label>
    </div>
    <v-btn variant="elevated" class="clear-button" @click="clearFilter">
        Очистити
    </v-btn>
    </div>
  </div>
  <hr />
  <h2>Наші водії</h2>
  <drivers-layout class=" drivers-list">
    <div v-for="item in getItemsList" :key="item.id" class="d-flex">
      <div>
        {{ item.name }} - стаж {{ item.experience }} років
      </div>
      <div>
        <v-btn density="compact" icon="mdi-pencil" @click="editItem(item.id)" class="btn-icon"></v-btn>
        <v-btn density="compact" icon="mdi-delete" @click="deleteItem(item.id)" class="btn-icon"></v-btn>
      </div>
    </div>
    <hr />
    <router-link
      :to="{
      name: 'driver-edit',}">
      <v-btn variant="elevated" class="add-button">
        Додати водія
      </v-btn>
      </router-link>
  </drivers-layout>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'

const initialQueryData = {
  orderType: null,
  driverName: null,
  driverExpFrom: null,
  driverExpTo: null,
}


export default {
  name: 'DriversView',
  computed: {
  ...mapGetters('drivers', ['getItemsList']),
    queryOptions() {
      return {
        orderBy: 'experience',
        orderType: this.queryOptData.orderType,
      }
    },
  },
  data() {
    return {
      queryOptData: {...initialQueryData},
    }
  },
  watch: {
    queryOptData: {
      handler() {
        this.loadData()
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('drivers', [
      'loadList',
      'addItem',
      'deleteItem',
      'updateItem',
      'loadFilteredData',
      ]),
    loadData() {

      const filtersOptions = []

      if (this.queryOptData.driverName)
        filtersOptions.push({
          fieldTitle: 'name',
          compareOperator: '==',
          valueToCompare: this.queryOptData.driverName,
      })

      const optionFrom = Number(this.queryOptData.driverExpFrom)
      if (optionFrom && optionFrom >=0)
        filtersOptions.push({
          fieldTitle: 'experience',
          compareOperator: '>=',
          valueToCompare: optionFrom,
        })

      const optionTo = Number(this.queryOptData.driverExpTo)
      if (optionTo && optionTo >=0)
        filtersOptions.push({
          fieldTitle: 'experience',
          compareOperator: '<=',
          valueToCompare: optionTo,
        })

        if(filtersOptions.length>0)
          this.loadFilteredData({
            filtersOptions,
            options: this.queryOptions,
          })
        else this.loadList(this.queryOptions)
    },
    editItem(id){
      this.$router.push({
        name: 'driver-edit',
        params: {id}
      })
    },
    clearFilter(){
      this.queryOptData = {...initialQueryData}
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
    margin-bottom: 5px;
    .search-section{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 650px;
      .search{
        margin-right: 15px;
      }
      .input-field{
        width: 150px;
        padding: 2px 5px;
        border: 1px solid grey;
        border-radius: 5px;
      }
      .experience-input{
        width: 45px;
      }
      .experience{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 200px;
        margin-right: 15px;
        span{
          margin-right: 5px;
        }
        label{
          display: flex;
          align-items: center;
          margin-right: 5px;
        }
      }
      .sort{
        margin-right: 15px;
      }
    }
    .btn-icon{
      margin-right: 5px;
      color: #00bd7ea6;
      :hover {
        color: #00bd7e;
      }
    }
  }
  .drivers-list{
    width: 400px;
  }
  a:hover {
    background-color: transparent;
  }
  .add-button, .clear-button{
    color: #00bd7e;
    border: 1px solid #00bd7e;
    background-color: #00bd7e23;
  }
  .clear-button{
    width: 100px;
    font-size: 12px;
  }
</style>