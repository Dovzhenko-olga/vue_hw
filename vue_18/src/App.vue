<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <router-link to="/">Головна</router-link>
        <router-link to="/friends">Друзі</router-link>
        <router-link to="/gifts">Подарунки</router-link>
        <router-link to="/appointments">Призначення подарунків</router-link>
      </nav>
    </div>
  </header>

  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
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

</style>
