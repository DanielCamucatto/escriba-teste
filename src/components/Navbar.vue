<template>
    <nav>
      <div class="left">
      <img src="/image/logo.png" alt="Logo da Empresa" />
      </div>
      <div class="middle desktop-item">
        <a v-for="(item, index) in menuItems" :key="index" :href="item.link" class="desktop-item--link" :class="{ selected: isActive(item.route) }">
          <i :class="item.iconClass"></i>{{ item.label }}
        </a>
      </div>
      <div class="right" @click="toggleMobileMenu">
        <i class="fa fa-bars mobile-item" ></i>
      </div>
    </nav>
    <nav id="mobile-menu" :class="{ hidden: isMobileMenuHidden }">
      <a v-for="(item, index) in menuItems" :key="index" :href="item.link" class="desktop-item--link" :class="{ selected: isActive(item.route) }">
        <i :class="item.iconClass"></i>{{ item.label }}
      </a>
    </nav>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        isMobileMenuHidden: true,
        menuItems: [
          { label: 'Home', route: '/', link: '#', iconClass: 'fa fa-home' },
          { label: 'Produtos', route: '/analytics', link: '#', iconClass: 'fa fa-cube' },
          { label: 'Pedidos', route: '/products', link: '#', iconClass: 'fa fa-book' },
        ],
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
  };
  </script>  