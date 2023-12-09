<template>
  <AppForm />
  <button class="btn btn-primary" @click="welcome">Login</button>
</template>

<script setup>
import AppForm from '@/components/form.vue'
const welcome = async () => {
  const res = await app.appContext.config.globalProperties.$axios.get('http://124.71.138.134:1216/welcome')
  console.log(app)
}
</script>
