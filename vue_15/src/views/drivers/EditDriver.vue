<template>
  <drivers-layout>
    <Form
      :validation-schema="schema"
      :initial-values="driver"
      :key="driver"
      @submit="onSubmit">
      <div class="input-section">
        <div class="field-section">
          <label for="name">Ім'я водія:</label>
          <Field name="name" type="text" placeholder="Введіть ім'я" class="input-field"/>
        </div>
        <ErrorMessage name="name" class="error-message"/>
      </div>
      <div class="input-section">
        <div class="field-section">
          <label for="experience">Стаж:</label>
          <Field name="experience" type="number" placeholder="Введіть стаж" class="input-field" />
        </div>
        <ErrorMessage name="experience" class="error-message"/>
      </div>
      <v-btn variant="elevated" type="submit" class="form-button">
        Submit
      </v-btn>
      <v-btn variant="elevated" type="button" @click="resetForm" class="form-button">
        Reset
      </v-btn>
    </Form>
  </drivers-layout>
</template>


<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

import * as yup from 'yup'
import { mapActions, mapGetters } from 'vuex'

const initialDriverData = {
  name: '',
  experience: null,
}

export default {
  name: "EditDriver",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      driver: { ...initialDriverData },
      schema: yup.object({
      name: yup.string().required(),
      experience: yup.number().required().min(1),
      }),
    }
  },
  computed: {
  ...mapGetters('drivers', ['getCurrentItem']),
  },
  watch: {
    getCurrentItem: {
      handler(newValue) {
        if (newValue) {
          this.driver = {
            name: newValue.name,
            experience: newValue.experience,
          }
        }
      },
    deep: true,
    immediate: true,
    },
  },
  methods: {
    ...mapActions('drivers', ['loadItemDataById', 'addItem', 'updateItem']),
    async onSubmit(values,) {
      try {
      if (this.id) {
        await this.updateItem({ itemId: this.id, data: values })
        console.log('Driver updated:', values)
      } else {
        await this.addItem(values)
        console.log('Driver created:', values)
      }
        this.$router.push({
          name: 'drivers-list',
        })
      } catch {
        alert('Щось пішло не так!')
      }
    },
    resetForm(){
      this.driver = { ...initialDriverData }
    }
  },
  created() {
    this.driver = { ...initialDriverData }
    if (this.id) {
      this.loadItemDataById(this.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.input-section{
  display: flex;
  align-items: center;
  width: 500px;
    .field-section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      width: 320px;
      .input-field{
        padding: 5px;
        border: 1px solid grey;
        border-radius: 5px;
      }
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