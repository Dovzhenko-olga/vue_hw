<template>
  <buses-layout>
    <Form
      :validation-schema="schema"
      :initial-values="bus"
      :key="bus"
      @submit="onSubmit">
      <div class="input-section">
        <div class="field-section">
          <label for="number">Номер автобуса:</label>
          <Field name="number" type="text" placeholder="Введіть номер автобуса" class="input-field"/>
        </div>
        <ErrorMessage name="number" class="error-message"/>
      </div>
      <div class="input-section">
        <div class="field-section">
          <label for="seats">Кількість місць:</label>
          <Field name="seats" type="number" placeholder="Введіть кількість місць" class="input-field" />
        </div>
        <ErrorMessage name="seats" class="error-message"/>
      </div>
      <v-btn variant="elevated" type="submit" class="form-button">
        Submit
      </v-btn>
      <v-btn variant="elevated" type="button" @click="resetForm" class="form-button">
        Reset
      </v-btn>
    </Form>
  </buses-layout>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

import * as yup from 'yup'
import { mapActions, mapGetters } from 'vuex'

const initialBusData = {
  name: '',
  experience: null,
}

  export default {
    name: "EditBus",
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
      bus: { ...initialBusData },
      schema: yup.object({
      number: yup.string().required(),
      seats: yup.number().required().min(1),
      }),
    }
  },
  computed: {
  ...mapGetters('buses', ['getCurrentItem']),
  },
  watch: {
    getCurrentItem: {
      handler(newValue) {
        if (newValue) {
          this.bus = {
            number: newValue.number,
            seats: newValue.seats,
          }
        }
      },
    deep: true,
    immediate: true,
    },
  },
  methods: {
    ...mapActions('buses', ['loadItemDataById', 'addItem', 'updateItem']),
    async onSubmit(values,) {
      try {
      if (this.id) {
        await this.updateItem({ itemId: this.id, data: values })
        console.log('Bus updated:', values)
      } else {
        await this.addItem(values)
        console.log('Bus created:', values)
      }
        this.$router.push({
          name: 'buses-list',
        })
      } catch {
        alert('Щось пішло не так!')
      }
    },
    resetForm(){
      this.bus = { ...initialBusData }
    }
  },
  created() {
    this.bus = { ...initialBusData }
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
  width: 520px;
    .field-section{
      display: flex;
      justify-content: space-between;
      padding: 5px;
      width: 370px;
      .input-field{
        padding: 2px 5px;
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