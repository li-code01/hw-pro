<template>  
  <AppForm />
  <button class="btn btn-primary" @click="welcome">web123</button>
</template>

<script setup>
import AppForm from '@/components/form.vue'
import service from '@/service/request'
const welcome = async () => {
  const res = await service.get('http://124.71.138.134:1216/welcome')
  console.log(res)
}
</script>
