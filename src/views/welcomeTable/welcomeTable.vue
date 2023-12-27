<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <break for=""> </break>
        <!-- row 1 -->
        <tr class="bg-base-200">
          <th>1</th>

          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr>
        <!-- row 2 -->
        <tr>
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
        <!-- row 3 -->
        <tr>
          <th>3</th>
          <td>Brice Swyre</td>
          <td>Tax Accountant</td>
          <td>Red</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import service from '@/service/request'
const tableData = ref([])
const initData = async () => {
  const res = await service.get('/spendApi?type=edit')
  tableData.value = res.data
}

onMounted(() => {
  // 在组件挂载后执行的代码
  console.log('组件已挂载')
  // 设置data的值为'Hello World'
  initData()
})
// onMounted(() => {})
</script>
