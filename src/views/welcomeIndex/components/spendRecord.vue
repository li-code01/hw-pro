<template>
  <dialog id="spendRecordModal" class="modal">
    <div class="modal-box">
      <form @submit.prevent="submitForm" class="form-control">
        <div v-for="(item, index) in formItems" :key="index" class="flex h-20 place-items-center">
          <!-- <label></label> -->
          <!-- <input v-model="item.value" :name="item.name" /> -->
          <label class="label cursor-pointer mr-10">{{ item.label }}</label>
          <template v-if="item.childern.length === 0">
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model="item.value"
              :name="item.name"
            />
          </template>
          <!-- <span class="label-text">context</span> -->
          <template v-if="item.childern.length > 0">
            <div
              v-for="(child, childIndex) in item.childern"
              :key="childIndex"
              class="flex h-20 w-1/2"
            >
              <div class="w-full card rounded-box place-items-center">
                <label v-show="child.label" class="label cursor-pointer" :name="child.name">{{
                  child.label
                }}</label>
                <span v-show="child.icon === 1" class="iconfont">&#xe68b;</span>
                <span v-show="child.icon === 0" class="iconfont">&#xe68d;</span>
                <input
                  :type="item.type"
                  placeholder="Type here"
                  :class="item.class"
                  :name="item.name"
                  :checked="child.checked"
                  :value="child.value"
                  v-model="item.value"
                />
              </div>
            </div>
          </template>
        </div>
        <button type="submit" class="btn btn-wide btn-secondary">Submit</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'
import dayjs from 'dayjs'
import service from '@/service/request'
const props = defineProps(['initSpend', 'editSpandParams', 'modalType', 'id', 'initData'])
// 用watch监听prpos中的editSpandParams
watch(props, (newVal) => {
  if (newVal) {
    console.log('editSpandParams', newVal.editSpandParams)
    const { context, date, mode, money, pay, pay_type, pay_user, type } = newVal.editSpandParams
    let cloneData = formItems.value
    cloneData = [
      { label: 'context:', name: 'context', value: context, type: 'text', childern: [] },
      {
        label: 'date:',
        name: 'date',
        value: date
          ? dayjs(date).format('YYYY/MM/DD HH:mm:00')
          : dayjs(date).format('YYYY/MM/DD HH:mm:00'),
        type: 'text',
        childern: []
      },
      {
        label: 'mode:',
        name: 'mode',
        type: 'radio',
        value: mode ?? '支出',
        class: 'radio',
        childern: [
          { label: '支出', value: '支出', name: 'mode' },
          { label: '收入', value: '收入', name: 'mode' }
        ]
      },
      { label: 'money:', name: 'money', value: money ?? 5.5, type: 'text', childern: [] },
      {
        label: 'pay:',
        name: 'pay',
        type: 'radio',
        value: pay ?? '信用卡',
        class: 'radio',
        childern: [
          { label: '信用卡', value: '信用卡', name: 'pay' },
          { label: '余额', value: '余额', name: 'pay' }
        ]
      },
      {
        label: 'pay_type:',
        name: 'pay_type',
        type: 'radio',
        class: 'radio',
        value: pay_type ?? 'zfb',
        childern: [
          { label: 'zfb', value: 'zfb', name: 'pay_type' },
          { label: 'wx', value: 'wx', name: 'pay_type' }
        ]
      },
      {
        label: 'pay_user:',
        name: 'pay_user',
        type: 'radio',
        value: pay_user ?? 'zzl',
        class: 'radio',
        childern: [
          { value: 'zzl', icon: 1, name: 'pay_user' },
          { value: 'fj', icon: 0, name: 'pay_user' }
        ]
      },
      { label: 'type:', name: 'type', value: type ?? '餐厅美食', childern: [] }
    ]
    formItems.value = cloneData
  }
})
// const { initSpend } = initSpend();
// 定义表单字段
const formItems = ref([
  { label: 'context:', name: 'context', value: 'test', type: 'text', childern: [] },
  {
    label: 'date:',
    name: 'date',
    value: dayjs().format('YYYY/MM/DD HH:mm:00'),
    type: 'text',
    childern: []
  },
  {
    label: 'mode:',
    name: 'mode',
    type: 'radio',
    value: '支出',
    class: 'radio',
    childern: [
      { label: '支出', value: '支出', name: 'mode', checked: true },
      { label: '收入', value: '收入', name: 'mode' }
    ]
  },
  { label: 'money:', name: 'money', value: 6, type: 'text', childern: [] },
  {
    label: 'pay:',
    name: 'pay',
    type: 'radio',
    value: '信用卡',
    class: 'radio',
    childern: [
      { label: '信用卡', value: '信用卡', name: 'pay', checked: true },
      { label: '余额', value: '余额', name: 'pay' }
    ]
  },
  {
    label: 'pay_type:',
    name: 'pay_type',
    type: 'radio',
    class: 'radio',
    value: 'zfb',
    childern: [
      { label: 'zfb', value: 'zfb', name: 'pay_type', checked: true },
      { label: 'wx', value: 'wx', name: 'pay_type' }
    ]
  },
  {
    label: 'pay_user:',
    name: 'pay_user',
    type: 'radio',
    value: 'zzl',
    class: 'radio',
    childern: [
      { value: 'zzl', icon: 1, name: 'pay_user', checked: true },
      { value: 'fj', icon: 0, name: 'pay_user' }
    ]
  },
  { label: 'type:', name: 'type', value: '餐厅美食', childern: [] }
])
// 表单提交的回调函数
const submitForm = async () => {
  const dialog = document.getElementById('spendRecordModal')
  const formData = formItems.value
  let result = {}
  console.log('formData', formData)
  formData.forEach((item) => {
    result[item.name] = item.value
  })
  if (props.modalType === 'edit') {
    result.action = 'edit'
    result.id = props.id
    await service.post(`/spendApi/spendRecord`, result)
    dialog.close()
    props.initData()
  } else {
    result.action = 'add'
    await service.post(`/spendApi/spendRecord`, result)
    dialog.close()
    props.initSpend ? props.initSpend() : props.initData()
  }
}
</script>
<style>
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont'; /* Project id 4400373 */
  src:
    url('//at.alicdn.com/t/c/font_4400373_kxy7pw57hc.woff2?t=1704441524845') format('woff2'),
    url('//at.alicdn.com/t/c/font_4400373_kxy7pw57hc.woff?t=1704441524845') format('woff'),
    url('//at.alicdn.com/t/c/font_4400373_kxy7pw57hc.ttf?t=1704441524845') format('truetype');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
label {
  display: block;
}
</style>
