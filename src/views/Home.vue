<template>
  <div>
    <Navbar />
    <h1 class="title-h1">Lista de clientes</h1>
    <SearchBar :filtroBusca="filtroBusca" @filtrar="filtrarLista" />

    <Modal :showModal="modalInternoVisivel" @close="modalInternoVisivel = false">
      <!-- Conteúdo do Modal Interno -->
    </Modal>
    <div class="action-buttons">
      <button @click="adicionarClienteModal" class="btn-primary">
        <i class="fa fa-plus"></i> Adicionar Cliente
      </button>
    </div>

    <!-- Lista de Clientes -->
    <ul class="card-items">
      <li v-for="cliente in todosClientes" :key="cliente.id" class="person">
        <p class="info-label">ID: {{ cliente.id }}</p>
        <p class="person-name">Nome: {{ cliente.nome }}</p>
        <p class="info-label">CPF: {{ cliente.cpf }}</p>
        <p class="info-label">Data de Nascimento: {{ cliente.dataNascimento }}</p>
        <div class="buttons">
          <button @click="editarCliente(cliente.id)" class="edit-button">
            <i class="fa fa-edit"></i>
          </button>
          <button @click="removerCliente(cliente.id)" class="delete-button">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal de Adicionar Cliente -->
    <Modal :showModal="modalAdicionarVisivel" @close="modalAdicionarVisivel = false">
      <div class="modal-wrapper">
        <h2>Adicionar Cliente</h2>
        <form @submit.prevent="adicionarNovoCliente">
          <div class="form-group">
            <label for="nome">ID:</label>
            <input v-model="novoCliente.id" type="text" id="id" required>
          </div>

          <div class="form-group">
            <label for="nome">Nome:</label>
            <input v-model="novoCliente.nome" type="text" id="nome" required>
          </div>

          <div class="form-group">
            <label for="cpf">CPF:</label>
            <input v-model="novoCliente.cpf" type="text" id="cpf" required>
          </div>

          <div class="form-group">
            <label for="dataNascimento">Data de Nascimento:</label>
            <input v-model="novoCliente.dataNascimento" type="date" id="dataNascimento" required>
          </div>

          <div class="button-container">
            <button type="submit" class="btn-primary">Adicionar</button>
          </div>
        </form>
      </div>

    </Modal>

    <!-- Modal de Edição de Cliente -->
    <Modal :showModal="modalEditarVisivel" @close="modalEditarVisivel = false">
      <div class="modal-wrapper">
        <h2>Editar Cliente</h2>
        <form @submit.prevent="salvarEdicaoCliente">
          <div class="form-group">
            <label for="editarNome">Nome:</label>
            <input v-model="clienteEditando.nome" type="text" id="editarNome" required>
          </div>

          <div class="form-group">
            <label for="editarCpf">CPF:</label>
            <input v-model="clienteEditando.cpf" type="text" id="editarCpf" required>
          </div>

          <div class="form-group">
            <label for="editarDataNascimento">Data de Nascimento:</label>
            <input v-model="clienteEditando.dataNascimento" type="date" id="editarDataNascimento" required>
          </div>

          <div class="button-container">
            <button type="submit" class="btn-primary">Salvar</button>
          </div>
        </form>
      </div>

    </Modal>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchPessoas } from '../api';
import Modal from '../components/Modal.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  components: {
    Modal,
    SearchBar
  },
  setup() {
    const modalAdicionarVisivel = ref(false);
    const modalInternoVisivel = ref(false);
    const novoCliente = ref<{ id: string; nome: string; cpf: string; dataNascimento: string }>({
      id: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
    });
    const modalEditarVisivel = ref(false);
    const clienteEditando = ref<{ id: string; nome: string; cpf: string; dataNascimento: string }>({
      id: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
    });
    const filtroBusca = ref('')

    const adicionarClienteModal = () => {
      modalAdicionarVisivel.value = true;
    };

    const editarDadosModal = () => {
      modalInternoVisivel.value = true;
    };

    const fecharModalAdicionar = () => {
      modalAdicionarVisivel.value = false;
    };

    const adicionarNovoCliente = () => {
      const novoClienteData = {
        id: novoCliente.value.id,
        nome: novoCliente.value.nome,
        cpf: novoCliente.value.cpf,
        dataNascimento: novoCliente.value.dataNascimento,
      };

      const listaClientesJSON = localStorage.getItem('listaClientes');
      let listaClientes = [];

      if (listaClientesJSON !== null) {
        try {
          listaClientes = JSON.parse(listaClientesJSON);
        } catch (error) {
          console.error('Erro ao analisar JSON:', error);
        }
      }

      listaClientes.push(novoClienteData);

      localStorage.setItem('listaClientes', JSON.stringify(listaClientes));

      novoCliente.value = { id: '', nome: '', cpf: '', dataNascimento: '' };

      fecharModalAdicionar();
      combinarDadosClientes();
    };

    const pessoas = ref([] as Array<{ id: number; nome: string; cpf: string; dataNascimento: string }>);
    const todosClientes = ref([] as Array<{ id: string; nome: string; cpf: string; dataNascimento: string }>);

    const combinarDadosClientes = () => {
      todosClientes.value = pessoas.value.map(cliente => ({
        id: cliente.id.toString(),
        nome: cliente.nome,
        cpf: cliente.cpf,
        dataNascimento: cliente.dataNascimento,
      }));

      const listaClientesJSON = localStorage.getItem('listaClientes');

      if (listaClientesJSON !== null) {
        const listaClientes = JSON.parse(listaClientesJSON);

        todosClientes.value.push(...listaClientes);
      }
    };

    onMounted(() => {
      fetchPessoas()
        .then(response => {
          pessoas.value = response.data;
          combinarDadosClientes();
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
        });
    });

    watch(pessoas, () => {
      combinarDadosClientes();
    });
    watch(filtroBusca, (novoValor) => {
      if (novoValor === '') {
        combinarDadosClientes();
      }
    });

    const removerCliente = (id: string) => {
      const clienteIndex = todosClientes.value.findIndex(cliente => cliente.id === id);

      if (clienteIndex !== -1) {
        todosClientes.value.splice(clienteIndex, 1);

        const listaClientesJSON = localStorage.getItem('listaClientes');
        if (listaClientesJSON !== null) {
          const listaClientes = JSON.parse(listaClientesJSON);
          const novaListaClientes = listaClientes.filter((cliente: { id: string; }) => cliente.id !== id);
          localStorage.setItem('listaClientes', JSON.stringify(novaListaClientes));
        }
      }
    };

    const editarCliente = (id: string) => {
      // Encontre o cliente pelo ID
      const cliente = todosClientes.value.find(cliente => cliente.id === id);
      if (cliente) {
        // Preencha os dados do cliente no estado de clienteEditando
        clienteEditando.value = { ...cliente };
        // Abra o modal de edição
        modalEditarVisivel.value = true;
      }
    };

    const salvarEdicaoCliente = () => {
      // Encontre o cliente pelo ID no array de todosClientes
      const cliente = todosClientes.value.find(cliente => cliente.id === clienteEditando.value.id);
      if (cliente) {
        // Atualize os dados do cliente com os dados editados
        cliente.nome = clienteEditando.value.nome;
        cliente.cpf = clienteEditando.value.cpf;
        cliente.dataNascimento = clienteEditando.value.dataNascimento;
      }

      // Feche o modal de edição
      modalEditarVisivel.value = false;
    };

    const filtrarLista = (termoBusca: string) => {
      if (termoBusca === '') {
        // Se o campo de busca estiver vazio, exiba todos os clientes novamente
        combinarDadosClientes();
      } else {
        // Filtrar a lista com base no critério de busca
        const resultadosFiltrados = todosClientes.value.filter(cliente => {
          return (
            cliente.nome.toLowerCase().includes(termoBusca) ||
            cliente.id.toLowerCase().includes(termoBusca) ||
            cliente.cpf.toLowerCase().includes(termoBusca) ||
            cliente.dataNascimento.toLowerCase().includes(termoBusca)
          );
        });

        // Atualizar a lista com os resultados filtrados
        todosClientes.value = resultadosFiltrados;
      }
    };

    return {
      modalAdicionarVisivel,
      novoCliente,
      adicionarClienteModal,
      fecharModalAdicionar,
      adicionarNovoCliente,
      editarDadosModal,
      editarCliente,
      modalInternoVisivel,
      todosClientes,
      removerCliente,
      modalEditarVisivel,
      clienteEditando,
      salvarEdicaoCliente,
      filtroBusca,
      filtrarLista,
    };
  },
};
</script>
