<template>
  <Navbar />
  <h1 class="title-h1">Lista de Produtos</h1>
  <div>
    <ProdutoLista :produtos="produtos" class="produtos-lista" />
  </div>
</template>
  
<script lang="ts">
import { ref, onMounted } from "vue";
import { fetchProdutos } from "../api";
import ProdutoLista from "../components/ProdutosLista.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    ProdutoLista,
    Navbar
  },
  setup() {
    const produtos = ref([]);

    onMounted(async () => {
      try {
        const response = await fetchProdutos();
        if (response && response.data) {
          produtos.value = response.data;
        } else {
          console.error("Resposta da API em um formato inesperado:", response);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    });

    return {
      produtos,
    };
  },
};
</script>
  