<template>
  <ul class="card-items">
    <li v-for="produto in produtos" :key="produto.id" class="person">
      <div class="info-label">
        <p class="person-name">ID: {{ produto.id }}</p>
        <p class="info-label">Descrição: {{ produto.descricao }}</p>
        <p class="info-label" v-if="produto.valorUnitario !== undefined">Valor Unitário: R$ {{ produto.valorUnitario.toFixed(2) }}</p>
        <p v-else>Valor Unitário: Não disponível</p> 
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Produto {
  id: number;
  descricao: string;
  valorUnitario?: number; 
}

export default defineComponent({
  props: {
    produtos: Array as () => Produto[],
  },
  methods: {
    editarProduto(id: number) {
      this.$emit("editar-produto", id);
    },
  },
});
</script>