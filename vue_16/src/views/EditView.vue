<template>
  <main-layout :is-loading="isLoading" :has-error="hasError">
    <header-component />
    <div class="edit-form" v-if="userPermissions.write">
      <div>
        <label>{{ $t('product.image') }} </label>
        <input
          v-model="product.img"
          type="text"
          name="image"
          :placeholder="$t('placeholders.image')"
        />
      </div>
      <div>
        <label>{{ $t('product.brand') }} </label>
        <select v-model="product.brand" name="brand">
          <option :value="undefined" class="notValid">{{ $t('placeholders.brand') }}</option>
          <option v-for="brand in brandsList" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </select>
      </div>
      <div>
        <label>{{ $t('product.seller') }} </label>
        <select v-model="product.seller" name="seller">
          <option :value="undefined" class="notValid">{{ $t('placeholders.seller') }}</option>
          <option v-for="seller in sellersList" :key="seller.id" :value="seller.id">
            {{ seller.title }}
          </option>
        </select>
      </div>
      <div>
        <label>{{ $t('product.description') }} </label>
        <textarea
          autocomplete="off"
          v-model="product.description"
          type="text"
          name="description"
          :placeholder="$t('placeholders.description')"
        ></textarea>
      </div>
      <div>
        <label>{{ $t('product.price') }} </label>
        <input
          v-model="product.price"
          type="number"
          name="price"
          :placeholder="$t('placeholders.price')"
        />
      </div>
      <button @click="onTaskAction">
        {{ editItemId ? $t('actionTitles.save') : $t('actionTitles.add') }}
      </button>
    </div>
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  name: 'EditView',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      product: {},
      taskCopy: null,
    }
  },
  computed: {
    ...mapGetters('users', ['userPermissions']),
    ...mapGetters('products', ['getItemById', 'isLoading', 'hasError']),
    ...mapGetters('brands', { brandsList: 'getItemsList' }),
    ...mapGetters('sellers', { sellersList: 'getItemsList' }),
    editItemId() {
      return this.$route.params.id
    },
  },
  methods: {
    ...mapActions('products', ['loadData', 'addItem', 'deleteItem', 'updateItem']),
    ...mapActions('brands', { loadBrandsList: 'loadList' }),
    ...mapActions('sellers', { loadSellersList: 'loadList' }),
    loadData() {
      const productItem = this.getItemById(this.editItemId)

      if (!this.editItemId) return

      this.product = { ...productItem }
      this.taskCopy = productItem
    },
    onTaskAction() {
      if (this.editItemId) {
        const data = {}
        if (this.product.image !== this.taskCopy.image) data.image = this.product.image
        if (this.product.description !== this.taskCopy.description)
          data.description = this.product.description
        if (this.product.price !== this.taskCopy.price) data.price = this.product.price
        this.updateItem({
          itemId: this.product.id,
          data,
        })
        this.$router.push('/')
      } else this.addItem(this.product)
      this.product = {}
      this.$router.push('/')
    },
  },
  created() {
    this.loadData()
    this.loadBrandsList()
    this.loadSellersList()
  },
}
</script>

<style scoped>
.edit-form {
  display: flex;
  max-width: 350px;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
}
.edit-form div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input,
select,
textarea {
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
textarea {
  min-height: 50px;
  resize: vertical;
}
button {
  cursor: pointer;
  padding: 5px;
}
</style>
