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
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/service/request'

const router = useRouter()
const name = ref('')
const pass = ref('')
const welcome = async () => {
  const dialog = document.getElementById('my_modal_2')
  console.log('dialog', dialog)
  if (pass.value === '123456') {
    const res = await service.get('/welcome')
    router.push('/welcome')
  } else {
    dialog.showModal()
  }
  console.log('route', router)
}
</script>

<style lang="scss" scoped></style>
