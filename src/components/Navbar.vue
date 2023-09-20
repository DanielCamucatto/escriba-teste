<template>
  <nav>
    <div class="left">
      <img src="/image/logo.png" alt="Logo da Empresa" />
    </div>
    <div class="middle desktop-item">
      <router-link to="/home" class="desktop-item--link" :class="{ selected: isActive('/') }">
        <i class="fa fa-home"></i> Home
      </router-link>
      <router-link to="/produtos" class="desktop-item--link" :class="{ selected: isActive('/analytics') }">
        <i class="fa fa-cube"></i> Produtos
      </router-link>
      <router-link to="/" class="desktop-item--link" :class="{ selected: isActive('/products') }">
        <i class="fa fa-book"></i> Pedidos
      </router-link>
    </div>
    <div class="right" @click="toggleMobileMenu">
      <i class="fa fa-bars mobile-item"></i>
    </div>
  </nav>
  <nav id="mobile-menu" :class="{ hidden: isMobileMenuHidden }">
    <router-link to="/home" class="desktop-item--link" :class="{ selected: isActive('/') }">
      <i class="fa fa-home"></i> Home
    </router-link>
    <router-link to="/produtos" class="desktop-item--link" :class="{ selected: isActive('/analytics') }">
      <i class="fa fa-cube"></i> Produtos
    </router-link>
    <router-link to="/" class="desktop-item--link" :class="{ selected: isActive('/products') }">
      <i class="fa fa-book"></i> Pedidos
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isMobileMenuHidden: true,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuHidden = !this.isMobileMenuHidden;
    },
    isActive(route: string) {
      return this.$route.path === route;
    },
  },
});
</script>
