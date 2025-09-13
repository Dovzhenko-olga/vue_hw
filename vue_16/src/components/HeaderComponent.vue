<template>
  <header>
    <div class="wrapper">
      <slot></slot>
      <nav>
        <div class="links">
          <router-link to="/">{{ $t('menu.home') }}</router-link>
          <router-link to="/contacts">{{ $t('menu.contacts') }}</router-link>
        </div>
        <div class="buttons">
          <select
            v-model="currentLanguage"
            name="language"
            @change="changeLanguage($event.target.value)"
          >
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </select>
          <!-- <button :class="{ active: !isUaLang }" @click="changeLanguage('en')">EN</button>
          <span>/</span>
          <button :class="{ active: isUaLang }" @click="changeLanguage('ua')">UA</button> -->
        </div>
        <div class="user">
          <div v-if="getUser">
            <div class="user__photo">
              <img
                :src="
                  getUser.photoURL ||
                  'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg'
                "
              />
            </div>
            <span>{{ getUser.displayName }}</span>
            <button @click="onLogout">{{ $t('actionTitles.logout') }}</button>
          </div>
          <router-link v-else to="/login">{{ $t('actionTitles.login') }}</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      currentLanguage: null,
    }
  },
  created() {
    this.$i18n.locale = localStorage.getItem('lastLanguage') || 'en'
    this.currentLanguage = this.$i18n.locale
    if (localStorage.getItem('lastLanguage') !== this.$i18n.locale) {
      localStorage.setItem('lastLanguage', this.$i18n.locale)
      this.currentLanguage = this.$i18n.locale
    }
    const self = this
    window.addEventListener('storage', function () {
      if (self.$i18n.locale !== localStorage.getItem('lastLanguage')) {
        self.$i18n.locale = localStorage.getItem('lastLanguage')
        self.currentLanguage = localStorage.getItem('lastLanguage')
        self.$router.go()
      }
    })
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    isUaLang() {
      return this.$i18n.locale === 'ua'
    },
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lastLanguage', this.$i18n.locale)
    },
    ...mapActions('auth', ['loginWithGoogle', 'logout']),
    ...mapActions('users', ['clearPermissions']),
    onLogout() {
      this.logout()
      this.clearPermissions()
      this.$router.push({
        name: 'login',
      })
    },
    async onLogin() {
      try {
        await this.loginWithGoogle()
        this.$router.push({
          name: 'home',
        })
      } catch {
        alert('Щось пішло не так')
      }
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lastLanguage', this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  padding-block: 15px;
}
.wrapper nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 0;
}

nav {
  width: 100%;
  height: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
}
.user div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.user__photo {
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  background-color: #0000000f;
  border-radius: 50%;
  overflow: hidden;
}
.user img {
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
.links {
  width: 60%;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
}
.buttons button {
  padding: 5px;
  background-color: #bebebe;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}
button.active {
  background-color: #898686;
}
.user button {
  padding: 5px;
}
</style>
