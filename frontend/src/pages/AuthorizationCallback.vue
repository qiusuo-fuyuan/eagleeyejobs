<template>
    <div>
      <template v-if="loading">
        Login In Progress...
      </template>
    </div>
</template>
  
<script setup lang="ts">
import type { WechatAuthorizationCallbackMutation, WechatAuthorizationCallbackMutationVariables } from '@/generated/graphql';
import { CurrentUserDetail, WechatAuthorizationCallback } from '@/graphql/queries';
import { setAuthToken } from '@/services/accessToken';
import { useMutation, useQuery } from '@vue/apollo-composable'
import { watchEffect } from 'vue';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute(); 

const authorizationCallbackInput: WechatAuthorizationCallbackMutationVariables = { authorizationCode: route.query.code as string, state: route.query.state as string}
const { mutate, loading } = useMutation<WechatAuthorizationCallbackMutation, WechatAuthorizationCallbackMutationVariables>(WechatAuthorizationCallback, 
{ variables: authorizationCallbackInput ,
  refetchQueries: [{ query: CurrentUserDetail }]}
)

mutate().then(result => {
  if(!loading.value) {
    setAuthToken(result?.data?.wechatAuthorizationCallback.jwtAccessToken as string, 
    result?.data?.wechatAuthorizationCallback.jwtRefreshToken as string)
    //redirect the user to jobs page.
    router.push({ name: 'jobs' })
  }
})
</script>

  