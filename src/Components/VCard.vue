<template>
  <div class="flex w-full">
    <button class="CartBtn" @click="add">
      <span class="IconContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            stroke-width="1.5"
          ></path>
          <path d="M8 12H16" stroke-width="1.5"></path>
          <path d="M12 16V8" stroke-width="1.5"></path>
        </svg>
      </span>
      <p class="text">Add</p>
    </button>
  </div>
  <div class="flex w-full flex-wrap">
    <template v-for="item in markList" :key="item._id">
      <div class="card">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <input
                :disabled="item.action === 'add'"
                :value="item.title"
                type="text"
                placeholder="Type here"
                class="input input-bordered input-warning"
              />
              <textarea
                :disabled="item.action === 'add'"
                class="textarea textarea-warning h-40"
                :value="item.context"
              ></textarea>
              <div class="flex justify-center">
                <button class="buttons" @click="deleteItem(item._id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 69 14"
                    class="svgIcon bin-top"
                  >
                    <g clip-path="url(#clip0_35_24)">
                      <path
                        fill="black"
                        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_35_24">
                        <rect fill="white" height="14" width="69"></rect>
                      </clipPath>
                    </defs>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 69 57"
                    class="svgIcon bin-bottom"
                  >
                    <g clip-path="url(#clip0_35_22)">
                      <path
                        fill="black"
                        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_35_22">
                        <rect fill="white" height="57" width="69"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="card">
      <div class="content">
        <div class="back">
          <div class="back-content">
            <input
              v-model="formData.title"
              type="text"
              placeholder="Title here"
              class="input input-bordered input-warning"
            />
            <textarea
              v-model="formData.context"
              class="textarea textarea-warning h-40"
              placeholder="Context here"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue'
import service from '@/service/request'
const markList = ref([])
const props = defineProps(['list', 'title'])
const formData = ref({
  title: '',
  context: ''
})
const add = async () => {
  const params = {
    action: 'add',
    type: 'train',
    title: formData.value.title,
    context: formData.value.context
  }
  await service.post('/markApi/markRecord', params)
  initData()
}
const deleteItem = async (id) => {
  if (id) {
    const params = {
      action: 'delete',
      id
    }
    await service.post('/markApi/markRecord', params)
    initData()
  }
}
const initData = async () => {
  const params = {
    type: 'train'
  }
  const res = await service.post('/markApi/getMarkList', params)

  if (res.status === 200) {
    markList.value = res.data.data
  }
}
onMounted(() => {
  initData()
})
</script>
<style scoped>
.card {
  overflow: visible;
  width: 350px;
  min-width: 350px;
  height: 300px;
  margin: 10px;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 300ms;
  box-shadow: 0px 0px 10px 1px #000000ee;
  border-radius: 5px;
}

.front,
.back {
  background-color: #151515;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.back::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
  animation: rotation_481 5000ms infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #151515;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}
.CartBtn {
  width: 140px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: 0.5s;
  overflow: hidden;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.103);
  position: relative;
}

.IconContainer {
  position: absolute;
  left: -50px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  transition-duration: 0.5s;
}

.icon {
  border-radius: 1px;
}

.text {
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  z-index: 1;
  transition-duration: 0.5s;
  font-size: 1.04em;
  font-weight: 600;
}

.CartBtn:hover .IconContainer {
  transform: translateX(58px);
  border-radius: 40px;
  transition-duration: 0.5s;
}

.CartBtn:hover .text {
  transform: translate(10px, 0px);
  transition-duration: 0.5s;
}

.CartBtn:active {
  transform: scale(0.95);
  transition-duration: 0.5s;
}
.buttons {
  width: 30px;
  height: 25px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  gap: 2px;
}

.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.svgIcon path {
  fill: white;
}

.buttons:hover {
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
  gap: 0;
}

.bin-top {
  transform-origin: bottom right;
}
.buttons:hover .bin-top {
  transition-duration: 0.5s;
  transform: rotate(160deg);
}
</style>
