<template>
  <products-layout>
    <header-component>
      <h1>{{ $t('menu.headTitle') }}</h1>
    </header-component>
    <div class="adding-line">
      <hr />
      <button v-if="userPermissions.write" @click="addProduct">{{ $t('actionTitles.add') }}</button>
      <hr v-if="userPermissions.write" />
    </div>
    <div class="home">
      <filter-component v-model="selectedFilters" :brands="brandsList" :sellers="sellersList" />
      <cards-component />
    </div>
  </products-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeaderComponent from '@/components/HeaderComponent.vue'
import CardsComponent from '@/components/CardsComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue'
import { where } from 'firebase/firestore/lite'

export default {
  name: 'HomeView',
  data() {
    return {
      searchPrice: null,
      selectedFilters: {
        selectedSellers: [],
        selectedBrands: [],
      },
    }
  },
  components: {
    HeaderComponent,
    CardsComponent,
    FilterComponent,
  },
  computed: {
    ...mapGetters('users', ['userPermissions']),
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('brands', { brandsList: 'getItemsList' }),
    ...mapGetters('sellers', { sellersList: 'getItemsList' }),
  },
  created() {
    this.loadList()
    this.loadBrandsList()
    this.loadSellersList()
  },
  methods: {
    ...mapActions('products', ['loadList', 'loadFilteredData']),
    ...mapActions('brands', { loadBrandsList: 'loadList' }),
    ...mapActions('sellers', { loadSellersList: 'loadList' }),
    loadData() {
      const { selectedBrands, selectedSellers } = this.selectedFilters
      const filters = []

      if (selectedSellers.length) {
        filters.push(where('seller', 'in', selectedSellers))
      }
      if (selectedBrands.length) {
        filters.push(where('brand', 'in', selectedBrands))
      }

      if (filters.length > 0) {
        this.loadFilteredData({ filters })
      } else {
        this.loadList()
      }
    },
    addProduct() {
      this.$router.push({
        name: 'edit',
      })
    },
  },
  watch: {
    selectedFilters: {
      handler() {
        this.loadData()
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.home {
  display: flex;
  gap: 25px;
}
hr {
  border: 1px solid grey;
}
.adding-line {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
button {
  cursor: pointer;
  padding: 5px;
  align-self: start;
}
</style>
