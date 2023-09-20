<template>
  <section class="section-login">
    <div class="register-box">
      <div class="register-gallery-box">
        <div class="gallery-title-box">
          <h1>Seja bem-vindo</h1>
          <p>
            Somos uma empresa dedica a facilitar os sistemas de cartório.
          </p>
        </div>
        <div class="gallery-brand-logo">
          ESCRIBA
        </div>
      </div>

      <div class="register-user-info-box">
        <div class="user-info-title-box">
          <h1>Login</h1>
          <p>
            Para começar a usar nosso sistema por favor, faça seu login
          </p>
        </div>

        <div class="user-info-box">
          <Login/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Login from '../components/Login.vue'
export default {
  components:{
    Login,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    },
  },
};
</script>

