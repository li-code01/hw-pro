<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="delSpendRecord" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ props.editSpandParams.context }}</h3>
      <p>{{ props.editSpandParams.date }}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="deleteItem">sub</button>
          <button class="btn" @click="close">close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { defineProps } from 'vue'
import service from '@/service/request'
const props = defineProps(['editSpandParams', 'id', 'initData'])

// 表单提交的回调函数
const close = async () => {
  const dialog = document.getElementById('spendRecordModal')
  dialog.close()
}
const deleteItem = async () => {
  const dialog = document.getElementById('spendRecordModal')
  try {
    let result = {}
    result.action = 'delete'
    result.id = props.id
    await service.post(`/spendApi/spendRecord`, result)
    props.initData()
  } catch {
    console.log('error')
  }
  dialog.close()
}
</script>
<style></style>
