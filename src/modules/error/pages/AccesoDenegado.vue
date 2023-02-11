<script setup lang="ts">
const router = useRouter()
const tryAgain = () => router.go(-3)
</script>

<template>
  <div class="page-error-404">
    <div class="error-symbol">
      <i class="entypo-attention" />
    </div>
    <div class="error-text">
      <h2>Acceso Denegado</h2>
    </div>
    <hr>
    <button type="button" class="btn btn-success btn-lg" @click="tryAgain">
      Regresar
    </button>
  </div>
</template>
