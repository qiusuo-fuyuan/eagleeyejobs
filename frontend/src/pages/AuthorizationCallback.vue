<template>
    <div>
      <template v-if="loading">
        Login In Progress...
      </template>
      <template v-else>
        <!-- Redirect to home page -->
        <router-link to="/jobs">Home</router-link>
      </template>
    </div>
</template>
  
<script setup lang="ts">
import type { WechatAuthorizationCallbackQuery, WechatAuthorizationCallbackQueryVariables } from '@/generated/graphql';
import { WechatAuthorizationCallback } from '@/graphql/queries';
import { useQuery } from '@vue/apollo-composable'
import { watchEffect } from 'vue';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute(); 

console.log(route.query)

const authorizationCallbackInput: WechatAuthorizationCallbackQueryVariables = { authorizationCode: route.query.code as string, state: route.query.state as string}
const { result, loading, error } = useQuery<WechatAuthorizationCallbackQuery, WechatAuthorizationCallbackQueryVariables>(WechatAuthorizationCallback, authorizationCallbackInput)

watchEffect(() => {
  // works for reactivity tracking
  if(!loading.value) {
    router.push({ name: 'jobs' })
  }
})
</script>
  