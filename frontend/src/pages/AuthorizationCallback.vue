<template>
    <div>
      <template v-if="loading">
        Login In Progress...
      </template>
    </div>
</template>
  
<script setup lang="ts">
import type { WechatAuthorizationCallbackQuery, WechatAuthorizationCallbackQueryVariables } from '@/generated/graphql';
import { WechatAuthorizationCallback } from '@/graphql/queries';
import { setAuthToken } from '@/services/auth';
import { useQuery } from '@vue/apollo-composable'
import { watchEffect } from 'vue';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute(); 

const authorizationCallbackInput: WechatAuthorizationCallbackQueryVariables = { authorizationCode: route.query.code as string, state: route.query.state as string}
const { result, loading, error } = useQuery<WechatAuthorizationCallbackQuery, WechatAuthorizationCallbackQueryVariables>(WechatAuthorizationCallback, authorizationCallbackInput)

watchEffect(() => {
  // works for reactivity tracking
  if(!loading.value) {
    setAuthToken(result.value?.wechatAuthorizationCallback.jwtToken as string)
    router.push({ name: 'jobs' })
  }
})
</script>
  