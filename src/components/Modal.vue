<template>
    <div class="modal" v-if="showModal" :style="{ display: showModal ? 'block' : 'none' }">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      showModal: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>