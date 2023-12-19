<template>
  <div role="tablist" class="tabs tabs-boxed">
    <a role="tab" class="tab" :class="tabskey === 1 ? 'tab-active' : ''" @click="selectTabs(1, 'welcomeIndex')">首页</a>
    <a role="tab" class="tab" :class="tabskey === 2 ? 'tab-active' : ''" @click="selectTabs(2, 'welcomeTable')">日历</a>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
  const tabskey = ref(1)
  const selectTabs = (key, url) => {
    tabskey.value = key
    router.push(url)
  }
</script>