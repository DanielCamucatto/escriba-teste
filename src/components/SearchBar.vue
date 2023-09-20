<template>
  <div class="search-box">
    <input class="search-box-input" v-model="filtroBusca" type="text" placeholder="Buscar por cliente" />
    <button @click="filtrarLista" class="search-box-btn btn-primary">Buscar</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    filtroBusca: String,
  },
  methods: {
    filtrarLista() {
      this.$emit('filtrar', this.filtroBusca);
    },
  },
};
</script>
