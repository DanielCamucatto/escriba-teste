<template>
  <form class="user-info-form" @submit.prevent="login">
    <div>
      <label for="email-ipt">E-MAIL</label>
      <input type="email" id="email-ipt" class="email-ipt" v-model="email">
      <div v-if="!isEmailValid && email" class="error-message">E-mail inválido</div>
    </div>

    <div>
      <label for="password-ipt">PASSWORD</label>
      <input type="password" id="password-ipt" class="password-ipt" v-model="password">
      <div v-if="!isPasswordValid && password" class="error-message">Senha inválida, precisa ter números e letras</div>
    </div>

    <button class="btn btn-primary" type="submit" :class="{ 'disable-button': isButtonDisabled }">LOGIN</button>
    <div v-if="isButtonClicked && isInputEmpty" class="error-message">Preencha todos os campos antes de continuar</div>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      password: '',
      isButtonClicked: false, // Adicione esta propriedade
    };
  },
  computed: {
    isEmailValid() {
      return this.email.includes('@');
    },
    isPasswordValid() {
      const hasLetter = /[a-zA-Z]/.test(this.password);
      const hasNumber = /\d/.test(this.password);
      return hasLetter && hasNumber;
    },
    isInputEmpty() {
      return !this.email || !this.password;
    },
    isButtonDisabled() {
      return !this.email || !this.password || (!this.isEmailValid || !this.isPasswordValid);
    },
  },
  methods: {
    login() {
      this.isButtonClicked = true; // Defina a propriedade como verdadeira quando o botão for clicado.
      if (!this.isInputEmpty) {
        if (this.isEmailValid && this.isPasswordValid) {
          console.log('Email:', this.email);
          console.log('Password:', this.password);
          this.$router.push('/home');
        } else {
          alert('Por favor, corrija os erros nos campos');
        }
      }
    },
  },
};
</script>
