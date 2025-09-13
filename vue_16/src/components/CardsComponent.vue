<template>
  <ul class="product-list">
    <li class="product" v-for="item in getItemsList" :key="item.id">
      <a class="product-link" href="#">
        <img class="product-img" :src="item.img" alt="laptop" />
      </a>
      <div class="product-descr">{{ item.description }}</div>
      <div class="product-price">{{ item.price }} ₴</div>
      <div class="product-buttons">
        <button v-if="userPermissions.delete" @click="deleteItem(item.id)">
          {{ $t('actionTitles.delete') }}
        </button>
        <button v-if="userPermissions.update" @click="onEdit(item.id)">
          {{ $t('actionTitles.edit') }}
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CardComponent',
  computed: {
    ...mapGetters('products', ['getItemsList']),
    ...mapGetters('users', ['userPermissions']),
  },
  methods: {
    ...mapActions('products', ['loadItemDataById', 'deleteItem', 'updateItem']),

    onEdit(id) {
      this.$router.push({
        name: 'edit',
        params: { id },
      })
    },
  },
}
</script>

<style scoped>
.product-list {
  padding-block: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
  gap: 15px;
}
.product {
  padding: 10px;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  transition: all 0.5s ease;
}
.product:hover {
  border-color: #797b79;
  box-shadow: 0px 0px 12px 0px #4f504f52;
}
.product-link {
  cursor: pointer;
  position: relative;
  aspect-ratio: 3/2;
}
.product-link:hover {
  background-color: transparent;
}
.product-link:hover .product-img {
  scale: 1.01;
}
.product-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 3/2;
  object-fit: contain;
}
.product-descr {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-height: 1.5;
}
.product-price {
  color: #ff0000;
}
.product-buttons {
  padding-inline: 10px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}
.product-buttons button {
  cursor: pointer;
  padding: 5px;
}
</style>
