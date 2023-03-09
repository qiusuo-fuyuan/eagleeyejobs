<template>
  <div class="header">
    <div class="header_topright">
      <div v-if="showLoginButton">
        <div v-if="loading">
          <div class="loading-overlay">
            <div class="spinner"></div>
          </div>
        </div>
        <div v-else>
          <img class="profile-pic" :src="result?.currentUserDetail?.profilePicture" alt="name" @click="showDropdown = !showDropdown">
          <div class="dropdown" v-show="showDropdown">
            <router-link class="dropdown-link" to="/user-profile">Profile</router-link>
            <a class="dropdown-link" href="#" @click.prevent="logout()">{{ $t("message.header.menu.logout")}}</a>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link id="button_login" to="/login">{{ $t("message.header.menu.login") }}</router-link>
      </div>
    </div>
    <LanguagePicker />
    <ul class=header_menu>
      <li>
        <router-link to="/jobs">{{ $t("message.header.menu.job") }}</router-link>
      </li>
      <li>
        <router-link to="/forum">{{ $t("message.header.menu.forum") }}</router-link>
      </li>
      <li>
        <router-link to="/stories">{{ $t("message.header.menu.stories") }}</router-link>
      </li>
      <li>
        <router-link to="/aboutUs">{{ $t("message.header.menu.aboutUs") }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import LanguagePicker from "./LanguagePicker.vue";
import type { CurrentUserDetailQuery } from "../generated/graphql";
import { CurrentUserDetail } from "../graphql/queries";
import { isTokenAvailable } from '../services/accessToken'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref, type Ref } from "vue";
import type { ApolloError } from "@apollo/client";


let showDropdown = ref(false);
const showLoginButton = computed(() => {
      return isTokenAvailable();
    });

let result: Ref<CurrentUserDetailQuery | undefined>, loading: Ref<boolean>, error: Ref<ApolloError | null>;
if (!showLoginButton.value) {
    ({result, loading, error } = useQuery<CurrentUserDetailQuery>(CurrentUserDetail));
}

const logout = () => {
  console.log("logging out")
}
</script>

<style lang="scss">

.header_topright {
  display: flex;
  justify-content: flex-end;
}

#button_login {
  margin: 0 10px;
}

.header_menu {
  list-style-type: none;
  display: flex; /* or inline-flex */
  justify-content: flex-end;

  li {
    flex-basis: 40rem
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* transparent white */
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>