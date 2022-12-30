<template>
    <div>
      <div v-if="selectedLoginOption === 'wechat'">
        <iframe v-if="!isLoading" :src="wechatLoginUrl" />
        <div v-else class="loading">Loading...</div>      </div>
      <div v-else>
        <form>
          <label>
            Email:
            <input type="email" v-model="email" />
          </label>
          <label>
            Password:
            <input type="password" v-model="password" />
          </label>
        </form>
      </div>
      <div class="login-options">
        <button type="button" @click="selectedLoginOption = 'recruiter'" class="recruiter">Recruiter Login</button>
        <button type="button" @click="selectedLoginOption = 'wechat'" class="wechat">WeChat Login</button>
    </div>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, watchEffect, ref } from "vue";
import axios from 'axios';

let selectedLoginOption = ref('wechat')
let email = ref('')
let password = ref('')
let wechatLoginUrl =  ref('')
let isLoading = ref(true)

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

async function getWeChatLoginUrl() {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/wechat/requestLoginUrl');
        wechatLoginUrl = response.data.url;
        isLoading.value = false
    } catch (error) {
        console.error(error);
    }
}

</script>
  
<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-options {
  position: relative;
}

.login-options .recruiter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-options .wechat {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
