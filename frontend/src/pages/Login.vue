<template>
    <div class="login-form">
      <div v-if="selectedLoginOption === 'wechat'">
        <div v-if="wechatLoginUrl === ''" class="loading">Loading...</div>   
        <iframe v-else :src="wechatLoginUrl" />
      </div>
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
        <button type="button" @click="loginOptionSelected('recruiter')" class="recruiter">Recruiter Login</button>
        <button type="button" @click="loginOptionSelected('wechat')" class="wechat">WeChat Login</button>
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

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

async function loginOptionSelected(option: string) {
  if(option == 'wechat') {
    selectedLoginOption.value = 'wechat'
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/wechat/requestLoginUrl');
        wechatLoginUrl.value = response.data
    } catch (error) {
        console.error(error);
    }
  }
  if(option == 'recruiter') {
    selectedLoginOption.value = 'recruiter'
  }
}

</script>

<style>
.login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 60%;
    width: 30%;
}

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

button {
    display: block;
}


</style>
