<img v-if="loading" src="/loadingScreen.gif" />
<template v-else>
  <Header />
  <router-view />
  <Footer />
</template>


<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { UserType, type CurrentUserDetailQuery } from "./generated/graphql";
import { CurrentUserDetail } from "./graphql/queries";
import { useQuery } from '@vue/apollo-composable'
import { watchEffect } from "vue";
import { ServerErrorCode } from "./services/serverErrors";
import { removeAuthToken } from "./services/auth";

const { result, loading, error, onError } = useQuery<CurrentUserDetailQuery>(CurrentUserDetail, null, { errorPolicy: 'none'});

watchEffect(() => {
  if(!loading && error) {
    onError((error) => { console.log(error)})
    const errorCode =  error.value?.graphQLErrors[0].extensions.code as ServerErrorCode
    console.log(errorCode)
    if(errorCode == ServerErrorCode.JWT_TOKEN_INVALID) {
      removeAuthToken()
      return 
    }
  } 
  if(result.value?.currentUserDetail?.role == UserType.Anonymous) {
    return
  }
})

</script>