<template>
  <div class="flex flex-col items-center justify-center dark">
    <div class="w-full bg-gray-800 rounded-lg shadow-md p-4">
      <div class="flex space-x-4 mb-4">
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
          <!-- <td>{{ item._id }}</td> -->
        </tr>
      </tbody>
    </table>
    <button class="join-item btn btn-outline" @click="prevPage" :disabled="page === 1">Prev</button>
    <button class="join-item btn btn-outline" @click="nextPage" :disabled="tableData.length <= 25">
      Next
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import service from '@/service/request'
const date = ref(dayjs().format('YYYY/MM'))
const tableData = ref([])
const loading = ref(false)
const page = ref(1)
const limit = ref(25)
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
  limit.value = 20
  const data = {
    date: date.value,
    page: page.value,
    limit: limit.value
  }
  const res = await service.post('/spendApi/getSpendList', data)
  console.log('res', res.data.data)
  tableData.value = res.data.data
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
// onMounted(() => {})
</script>
