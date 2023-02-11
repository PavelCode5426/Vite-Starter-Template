<template>
  <div class="page-error-404">
    <div class="error-symbol">
      <i class="entypo-attention"></i>
    </div>
    <div class="error-text">
      <h2>Ha ocurrido un error</h2>
      <p>{{ message }}</p>
    </div>
    <hr>
    <button type="button" class="btn btn-success btn-lg" @click="tryAgain">Intentar otra vez</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const {message} = router.currentRoute.value.query
const tryAgain = () => router.go(-2)
</script>