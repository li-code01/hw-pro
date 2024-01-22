<template>
  <div class="flex justify-center" style="margin-top: 50px">
    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
          <span :style="'--value: ' + hour"></span>
        </span>
        hours
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
          <span :style="'--value: ' + min"></span>
        </span>
        min
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="countdown font-mono text-5xl">
          <span :style="'--value: ' + sec"></span>
        </span>
        sec
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="flex justify-center">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <span class="iconfont" style="font-size: 50px; color: #00aeff">&#xe67e;</span>
        </div>
        <div class="stat-title">Today</div>
        <div class="stat-value" style="color: #00aeff">{{ todaySpend }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <span class="iconfont" style="font-size: 50px; color: #cf0072">&#xe63f;</span>
        </div>
        <div class="stat-title">Month</div>
        <div class="stat-value" style="color: #cf0072">{{ monthSpend }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <span
            class="iconfont cursor-pointer"
            style="font-size: 50px; color: #00d2f3"
            @click="addSpendRecord"
            >&#xe664;</span
          >
        </div>
        <div class="stat-title">add</div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <SpendTotalChart />
  <SpendRecord :initSpend="initSpend" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import service from '@/service/request'
// 引入SpendTotalChart组件
import SpendTotalChart from './components/spendTotalChart.vue'
import SpendRecord from './components/spendRecord.vue'
const sec = ref(dayjs().get('second'))
const min = ref(dayjs().get('minute'))
const hour = ref(dayjs().get('hour'))
const addSpendRecord = () => {
  const dialog = document.getElementById('spendRecordModal')
  dialog.showModal()
}
const initSpend = async () => {
  const queryDate = dayjs().format('YYYY/MM')
  const params = {
    date: queryDate,
    page: 1,
    limit: 1000
  }
  const res = await service.post('/spendApi/getSpendList', params)
  const { data } = res.data
  // 计算当天
  todaySpend.value = data
    .reduce((acc, item) => {
      let itemTaday = dayjs(item.date).format('DD')
      let nowTaday = dayjs().format('DD')
      if (itemTaday === nowTaday) {
        return acc + item.money
      } else {
        return acc
      }
    }, 0)
    .toFixed(2)
  monthSpend.value = data
    .reduce((acc, item) => {
      return acc + item.money
    }, 0)
    .toFixed(2)
}
onMounted(() => {
  initSpend()
})
const todaySpend = ref(0)
const monthSpend = ref(0)
// 实现一个时分秒倒计时
setInterval(() => {
  sec.value++
  if (sec.value === 60) {
    min.value++
    sec.value = 0
  }
  if (min.value === 60) {
    hour.value++
    min.value = 0
  }
}, 1000)
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
</style>
