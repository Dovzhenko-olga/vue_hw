<template>
  <h2>Призначення</h2>
  <div class="d-flex">
  <drivers-layout>
    <buses-layout>
      <div v-for="item in getDriversWithBus" :key="item.id" class="d-flex">
        <div>
          {{item.name}} - {{item.busNumber}}
        </div>
        <v-btn density="compact" icon="mdi-delete" @click="deleteTrip(item.id)" class="btn-icon"></v-btn>
      </div>
      <hr />
      <h2>Нове призначення</h2>
      <Form
        v-slot="{ handleReset }"
        :validation-schema="schema"
        :initial-values="appointment"
        @submit="onSubmit">

      <div class="select-item">
        Шофер: 

        <Field name="driver" as="select" class="select">
          <option value="" disabled>Оберіть водія</option>
          <option v-for="driver in driversList" :key="driver.id" :value="driver.id">
            {{ driver.name }}
          </option>
        </Field>
        <ErrorMessage name="driver" class="error-message"/>
      </div>

      <div class="select-item">
        Автобус: 

        <Field name="bus" as="select" class="select">
          <option value="" disabled>Оберіть автобус</option>
          <option v-for="bus in busesList" :key="bus.id" :value="bus.id">
            {{ bus.number }}
          </option>
        </Field>
        <ErrorMessage name="bus" class="error-message"/>
      </div>
        <v-btn variant="elevated" type="submit" class="form-button">
            Submit
          </v-btn>
          <v-btn variant="elevated" type="button" @click="handleReset" class="form-button">
            Reset
          </v-btn>
      </Form>
    </buses-layout>
  </drivers-layout>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'

const initialSelectData = {
  driver: '',
  bus: '',
}

  export default {
    name: "AppointmentView",
    components: {
    Form,
    Field,
    ErrorMessage
  },
    computed: {
      ...mapGetters('drivers', {driverById: 'getItemById', driversList:'getItemsList'}),
      ...mapGetters('buses', {busesList:'getItemsList'}),
      getDriversWithBus(){
        
        return this.driversList.filter(driver => driver.busId).map(driver =>({
          ...driver,
          busNumber: this.getBusNumberById(driver.busId),
        }))
      }
  },
  data() {
    return {
      appointment: {...initialSelectData},
      schema: yup.object({
        driver: yup.string().required('Поле водія є обов\'язковим'),
        bus: yup.string().required('Номер автобуса є обов\'язковим'),
      }),
    }
  },
  methods: {
    ...mapActions('drivers', {
      loadDriversList: 'loadList',
      updateDriver: 'updateItem',
  }),
    ...mapActions('buses', {
      loadBusesList: 'loadList',
      updateItem: 'updateItem',
  }),
      
      getDriverNameById(id){
        return this.driversList.find(driver=>driver.id === id).name
      },
      getBusNumberById(id){
        return this.busesList.find(bus=>bus.id === id).number
      },
      deleteTrip(id){
        const currentDriver = this.driversList.find(driver=>driver.id === id)
        this.updateDriver({ itemId: id, data: {...this.driverById(id), busId: null} })
      },
    async onSubmit(values, {resetForm}) {
      const currentDriverData = this.driverById(values.driver)
      try {
        await 
          this.updateDriver({itemId: values.driver, data: {
            ...currentDriverData,
            busId: values.bus
          }})
          console.log('Product updated:', {
            ...currentDriverData,
            busId: values.bus
          })
        resetForm()
      } catch {
        alert()
      }
    },
  },
  created() {
    this.loadDriversList()
    this.loadBusesList()
  },
  }
</script>

<style lang="scss" scoped>
  .d-flex {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin-bottom: 5px;
    .btn-icon{
      color: #00bd7ea6;
      :hover {
        color: #00bd7e;
      }
    }
  }
  .select-item{
    margin-bottom: 5px;
    .select{
      padding: 2px 5px;
      border: 1px solid grey;
      border-radius: 5px;
      margin-right: 5px;
    }
    .error-message{
      color: red;
      font-size: 12px;
    }
  }
    .form-button{
      color: #00bd7e;
      border: 1px solid #00bd7e;
      background-color: #00bd7e23;
      margin-right: 10px;
    }
</style>