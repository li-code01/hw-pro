<template>
  <div class="flex flex-col items-center justify-center dark">
    <div class="w-full bg-gray-800 rounded-lg shadow-md p-4">
      <div class="flex space-x-4">
        <input
          v-model="date"
          placeholder="First Name"
          class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="text"
        />

        <button
          class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold p-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          @click="queryData"
        >
          搜索
        </button>
        <button class="btn-shine" @click="addSpendRecord">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
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
        </button>
      </div>
    </div>
  </div>

  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>context</th>
          <th>date</th>
          <th>mode</th>
          <th>money</th>
          <th>pay</th>
          <th>pay_type</th>
          <th>pay_user</th>
          <th>type</th>
          <th>action</th>
          <!-- <th>_id</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item._id">
          <td>{{ item.context }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.mode }}</td>
          <td>
            <div class="flex w-full">
              <div class="grid w-20">
                {{ item.money }}
              </div>
              <div class="grid w-5">
                <progress
                  class="progress w-20"
                  :class="item.money > 250 ? 'progress-secondary' : 'progress-primary'"
                  :value="item.money"
                  max="500"
                ></progress>
              </div>
            </div>
          </td>
          <td>{{ item.pay }}</td>
          <td>{{ item.pay_type }}</td>
          <td>{{ item.pay_user }}</td>
          <td>{{ item.type }}</td>
          <td class="w-20">
            <div class="flex justify-around items-center">
              <button class="button" @click="editSpandItem(item)">
                <svg
                  class="svg-icon"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="#a649da" stroke-linecap="round" stroke-width="2">
                    <path d="m20 20h-16"></path>
                    <path
                      clip-rule="evenodd"
                      d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z"
                      fill-rule="evenodd"
                    ></path>
                  </g>
                </svg>
                <span class="lable">Edit</span>
              </button>
              <button class="buttons" @click="deleteSpandItem(item)">
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
          </td>
        </tr>
      </tbody>
    </table>
    <button class="join-item btn btn-outline" @click="prevPage" :disabled="page === 1">Prev</button>
    <button class="join-item btn btn-outline" @click="nextPage" :disabled="tableData.length !== 18">
      Next
    </button>
    <SpendRecord :editSpandParams="editSpandParams" :modalType="modalType" />
    <DelSpendRecord :editSpandParams="editSpandParams" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import SpendRecord from '../welcomeIndex/components/spendRecord.vue'
import DelSpendRecord from './components/delSpendRecord.vue'
import service from '@/service/request'
const date = ref(dayjs().format('YYYY/MM'))
const tableData = ref([])
const modalType = ref('')
const editSpandParams = ref({})
const loading = ref(false)
const page = ref(1)
const limit = ref(18)
const initData = async () => {
  const data = {
    date: date.value,
    page: page.value,
    limit: limit.value
  }
  const res = await service.post('/spendApi/getSpendList', data)
  console.log('res', res.data.data)
  tableData.value = res.data.data
}
const queryData = async () => {
  page.value = 1
  limit.value = 18
  const data = {
    date: date.value,
    page: page.value,
    limit: limit.value
  }
  const res = await service.post('/spendApi/getSpendList', data)
  console.log('res', res.data.data)
  tableData.value = res.data.data
}
const addSpendRecord = () => {
  const dialog = document.getElementById('spendRecordModal')
  dialog.showModal()
}
const editSpandItem = (item) => {
  console.log('item', item)
  const dialog = document.getElementById('spendRecordModal')
  dialog.showModal()
  modalType.value = 'edit'
  editSpandParams.value = item
}
const deleteSpandItem = (item) => {
  console.log('delSpendRecord', item)
  const dialog = document.getElementById('delSpendRecord')
  dialog.showModal()
  editSpandParams.value = item
}
const nextPage = () => {
  console.log('nextPage')
  if (loading.value === true) return // 加载中时不允许翻页
  if (tableData.value.length === 0) return // 没有数据时不允许翻页
  page.value++
  initData() // 加载上一页数据
}
const prevPage = () => {
  console.log('prevPage')
  if (loading.value === true) return // 加载中时不允许翻页
  if (tableData.value.length === 0) return // 没有数据时不允许翻页
  page.value--
  initData() // 加载上一页数据
}
onMounted(() => {
  // 在组件挂载后执行的代码
  console.log('组件已挂载')
  // 设置data的值为'Hello World'
  initData()
})
</script>
<style>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 2px;
  height: 30px;
  width: 85px;
  border: none;
  background: #a549da3d;
  border-radius: 20px;
  cursor: pointer;
}

.lable {
  line-height: 22px;
  font-size: 19px;
  color: #a649da;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.button:hover {
  background: #a549da62;
}

.button:hover .svg-icon {
  animation: lr 1s linear infinite;
}

@keyframes lr {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-1px);
  }

  75% {
    transform: translateX(1px);
  }

  100% {
    transform: translateX(0);
  }
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
.btn-shine {
  border: 1px solid;
  overflow: hidden;
  position: relative;
}

.btn-shine span {
  z-index: 20;
}

.btn-shine:after {
  background: #38ef7d;
  content: '';
  height: 55px;
  left: -75px;
  opacity: 0.4;
  position: absolute;
  top: -50px;
  transform: rotate(35deg);
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  width: 50px;
  z-index: -10;
}

.btn-shine:hover:after {
  left: 120%;
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
}
.btn-shine {
  position: relative;
  margin: 0;
  padding: 6px;
  outline: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #fff;
  border: 1px solid rgba(22, 76, 167, 0.6);
  border-radius: 10px;
  color: #1d89ff;
  font-weight: 400;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}

.btn-shine span {
  color: #164ca7;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
}

.btn-shine:hover {
  animation: rotate624 0.7s ease-in-out both;
}

.btn-shine:hover span {
  animation: storm1261 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

@keyframes rotate624 {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(3deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-3deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

@keyframes storm1261 {
  0% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }

  25% {
    transform: translate3d(4px, 0, 0) translateZ(0);
  }

  50% {
    transform: translate3d(-3px, 0, 0) translateZ(0);
  }

  75% {
    transform: translate3d(2px, 0, 0) translateZ(0);
  }

  100% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
}
</style>
