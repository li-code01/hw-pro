<template>
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
          <td>{{ item.money }}</td>
          <td>{{ item.pay }}</td>
          <td>{{ item.pay_type }}</td>
          <td>{{ item.pay_user }}</td>
          <td>{{ item.type }}</td>
          <!-- <td>{{ item._id }}</td> -->
        </tr>
      </tbody>
    </table>
    <button class="join-item btn btn-outline" @click="prevPage">Prev</button>
    <button class="join-item btn btn-outline" @click="nextPage">Next</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import service from '@/service/request'
const tableData = ref([])
const loading = ref(false)
const page = ref(1)
const limit = ref(30)
const initData = async () => {
  const res = await service.get(
    `/spendApi/getSpendList?type=edit&page=${page.value}&limit=${limit.value}`
  )
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
