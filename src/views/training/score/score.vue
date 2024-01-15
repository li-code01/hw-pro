<template>
  <div class="text-center font-bold">{{ title }}</div>
  <div class="text-center">{{ result }}</div>
  <div class="text-center">{{ showAsk }}</div>
  <div class="w-full flex items-center justify-center cursor-pointer">
    <div
      class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
      @click="next"
    >
      <span
        class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
      ></span>
      <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          class="w-5 h-5 text-green-400"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </span>
      <span
        class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          class="w-5 h-5 text-green-400"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </span>
      <span
        class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
        >next</span
      >
    </div>
    <div
      class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
      @click="showAskClick"
      v-if="result === 'NO'"
    >
      <span
        class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
      ></span>
      <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          class="w-5 h-5 text-green-400"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </span>
      <span
        class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          class="w-5 h-5 text-green-400"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </span>
      <span
        class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
        >答案</span
      >
    </div>
  </div>
  <form class="radio-form">
    <div>
      <input checked="{{ score === 1 }}" :value="score" name="hopping" type="radio" id="a" />
      <label for="a" @click="clickHand(1)"><span></span>1</label>
    </div>
    <div>
      <input checked="{{ score === 3 }}" value="3" name="hopping" type="radio" id="b" />
      <label for="b" @click="clickHand(3)"><span></span>3</label>
    </div>
    <div>
      <input checked="{{ score === 6 }}" value="6" name="hopping" type="radio" id="c" />
      <label for="c" @click="clickHand(6)"><span></span>6</label>
    </div>
    <div>
      <input checked="{{ score === 9}}" value="9" name="hopping" type="radio" id="d" />
      <label for="d" @click="clickHand(9)"><span></span>9</label>
    </div>
    <div>
      <input checked="{{ score === 12 }}" value="12" name="hopping" type="radio" id="e" />
      <label for="e" @click="clickHand(12)"><span></span>12</label>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import service from '@/service/request'
const title = ref('')
const score = ref(0)
const topicArr = ref('')
const result = ref('')
const showAsk = ref('')
const init = async () => {
  const res = await service.get('/scoreApi')
  console.log('🚀 ~ init ~ res:', res.data.data)
  if (res.data.data) {
    title.value = res.data.data[0].title
    topicArr.value = res.data.data
  }
}
const next = () => {
  const random = Math.floor(Math.random() * 24)
  title.value = topicArr.value[random].title
  result.value = ''
  showAsk.value = ''
}
const showAskClick = () => {
  const findItem = topicArr.value.find((item) => item.title === title.value)
  showAsk.value = findItem.ask
}
const clickHand = (value) => {
  console.log(value)
  const findItem = topicArr.value.find((item) => item.title === title.value)
  // 生成一个0-24的随机数

  if (findItem.ask === value) {
    result.value = 'OK'
    next()
  } else {
    result.value = 'NO'
  }
}
onMounted(() => {
  init()
})
</script>
<style>
/* SWITCH
--------------------------------------------- */

.radio-form {
  display: flex;
  margin: auto;
  max-width: 10em;
  position: relative;
}

.radio-form input {
  position: fixed;
  top: -1.5em;
  left: -1.5em;
}

.radio-form label {
  cursor: pointer;
  display: block;
  font-weight: bold;
  text-shadow: 0 0.1em 0.1em rgba(0, 0, 0, 0.2);
  transition: color 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
}

.radio-form label:not(:last-of-type) {
  margin-bottom: 1.5em;
}

.radio-form label span {
  box-shadow:
    0 0 0 0.2em currentColor inset,
    0 0.2em 0.2em rgba(0, 0, 0, 0.2),
    0 0.3em 0.2em rgba(0, 0, 0, 0.2) inset;
  display: inline-block;
  margin-right: 0.5em;
  vertical-align: bottom;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  transition:
    transform 0.2s cubic-bezier(0.5, 0, 0.5, 2),
    box-shadow 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95),
    color 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
}

.radio-form input:checked + label,
.radio-form input:checked + label span {
  color: #255ff4;
}

.radio-form input:checked + label,
.radio-form input:checked + label span {
  transition-delay: 0.4s;
}

.radio-form label span {
  transform: scale(1.2);
}

.radio-form .worm {
  top: 0.375em;
  left: 0.375em;
  position: absolute;
}

.radio-form .worm__segment {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.75em;
  height: 0.75em;
  border-radius: 50%;
  transition: transform 0.4s cubic-bezier(0.45, 0.05, 0.55, 0.95);
}

.radio-form .worm__segment:before {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  background: currentColor;
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.radio-form .worm__segment:first-child:before,
.radio-form .worm__segment:last-child:before {
  box-shadow: 0 0 1em 0 currentColor;
}

@keyframes hop1 {
  from,
  to {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-1.5em);
  }
}

@keyframes hop2 {
  from,
  to {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-1.5em);
  }
}

@keyframes hop3 {
  from,
  to {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-1.5em);
  }
}

.radio-form input:nth-of-type(1):checked ~ .worm .worm__segment {
  transform: translateY(0);
}

.radio-form input:nth-of-type(1):checked ~ .worm .worm__segment:before {
  animation-name: hop1;
}

.radio-form input:nth-of-type(2):checked ~ .worm .worm__segment {
  transform: translateY(3em);
}

.radio-form input:nth-of-type(2):checked ~ .worm .worm__segment:before {
  animation-name: hop2;
}

.radio-form input:nth-of-type(3):checked ~ .worm .worm__segment {
  transform: translateY(6em);
}

.radio-form input:nth-of-type(3):checked ~ .worm .worm__segment:before {
  animation-name: hop3;
}

@media screen and (prefers-color-scheme: dark) {
  body {
    background: #17181c;
    color: #e3e4e8;
  }

  .radio-form input:checked + label,
  .radio-form input:checked + label span,
  .radio-form .worm__segment:before {
    color: #5583f6;
  }
}
</style>
