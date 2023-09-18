<template>
  <div>
    <Navbar />
    <Modal :showModal="modalInternoVisivel" @close="modalInternoVisivel = false">
      <div class="modal-content">
        <h2>Título do Modal Interno</h2>
        <p>Conteúdo do Modal Interno.</p>
      </div>
    </Modal>
    <!-- Adicione os botões de ação aqui -->
    <div class="action-buttons">
      <button @click="adicionarClienteModal" class="btn-primary">
        <i class="fa fa-plus"></i> Adicionar Cliente
      </button>
      <button @click="editarDadosModal" class="btn-primary">
        <i class="fa fa-edit"></i> Editar Dados do Cliente
      </button>
    </div>

    <ul class="card-items">
      <li v-for="pessoa in pessoas" :key="pessoa.id" class="person">
        <p class="info-label">ID: {{ pessoa.id }}</p>
        <p class="person-name">Nome: {{ pessoa.nome }}</p>
        <p class="info-label">CPF: {{ pessoa.cpf }}</p>
        <p class="info-label">Data de Nascimento: {{ pessoa.dataNascimento }}</p>
        <button @click="removerPessoa(pessoa.id)" class="delete-button">
          <i class="fa fa-trash"></i> <!-- Ícone de lixeira -->
        </button>
      </li>
    </ul>

    <!-- Modal de Adicionar Cliente -->
    <Modal :showModal="modalAdicionarVisivel" @close="modalAdicionarVisivel = false">
      <h2>Adicionar Cliente</h2>
      <form @submit.prevent="adicionarNovoCliente">
        <div>
          <label for="nome">Nome:</label>
          <input v-model="novoCliente.nome" type="text" id="nome" required>
        </div>

        <div>
          <label for="cpf">CPF:</label>
          <input v-model="novoCliente.cpf" type="text" id="cpf" required>
        </div>

        <div>
          <label for="dataNascimento">Data de Nascimento:</label>
          <input v-model="novoCliente.dataNascimento" type="date" id="dataNascimento" required>
        </div>

        <button type="submit" class="btn-primary">Adicionar</button>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { fetchPessoas } from '../api';
import { ref } from 'vue';
import Modal from '../components/Modal.vue';

export default {
  components: {
    Modal,
  },
  setup() {
    const pessoas = ref([] as Array<{ id: number; nome: string; cpf: string; dataNascimento: string }>);
    const modalAdicionarVisivel = ref(false);
    const modalInternoVisivel = ref(false);
    const novoCliente = ref({ nome: '', cpf: '', dataNascimento: '' });


    const removerPessoa = (id: number) => {
      pessoas.value = pessoas.value.filter(pessoa => pessoa.id !== id);
    };

    const adicionarClienteModal = () => {
      modalAdicionarVisivel.value = true;
    };

    const editarDadosModal = () => {
      modalInternoVisivel.value = true; // Abra o modal interno
      // Você pode adicionar lógica adicional para preencher o modal de edição aqui
    };

    const fecharModalAdicionar = () => {
      modalAdicionarVisivel.value = false;
    };

    const adicionarNovoCliente = () => {
      // Valide os dados do formulário, por exemplo, verificando se estão preenchidos corretamente.

      // Obtenha os dados do novo cliente do ref novoCliente.
      const novoClienteData = {
        nome: novoCliente.value.nome,
        cpf: novoCliente.value.cpf,
        dataNascimento: novoCliente.value.dataNascimento,
      };

      // Armazene os dados do novo cliente no localStorage.
      localStorage.setItem('novoCliente', JSON.stringify(novoClienteData));

      // Limpe os campos do formulário ou faça outras ações necessárias.

      // Adicione o novo cliente à lista de clientes (opcional).
      // ...

      // Feche o modal de adição.
      fecharModalAdicionar();
    };

    const novoClienteDataJSON = localStorage.getItem('novoCliente');

    if (novoClienteDataJSON !== null) {
      const novoClienteData = JSON.parse(novoClienteDataJSON);
      if (typeof novoClienteData === 'object' && novoClienteData !== null) {
        novoCliente.value.nome = novoClienteData.nome;
        novoCliente.value.cpf = novoClienteData.cpf;
        novoCliente.value.dataNascimento = novoClienteData.dataNascimento;
      }
    }

    fetchPessoas()
      .then(response => {
        pessoas.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });

    return {
      pessoas,
      modalAdicionarVisivel,
      novoCliente,
      removerPessoa,
      adicionarClienteModal,
      fecharModalAdicionar,
      adicionarNovoCliente,
      editarDadosModal,
      modalInternoVisivel,
    };
  },
};
</script>
