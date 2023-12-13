<template>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form class="card-body" @submit.prevent="welcome">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                class="input input-bordered"
                required
                v-model.trim.lazy="name"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                required
                v-model.trim.lazy="pass"
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import service from '@/service/request'
  const router = useRouter()
  const name = ref('')
  const pass = ref('')
  const welcome = async () => {
    console.log('route', router);
    const res = await service.get('/welcome')
    router.push('/welcome')
  }
  </script>
  
  <style lang="scss" scoped></style>
  