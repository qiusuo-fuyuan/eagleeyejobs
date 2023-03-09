<template>
    <div class="user-profile">
      <img :src="userDetails.profilePicture" @click="toggleDropdown" />
      <div v-if="showDropdown" class="dropdown">
        <ul>
          <li><router-link :to="'/users/' + userDetails.userId">{{ userDetails.name }}</router-link></li>
          <li @click="logout">Logout</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import type { UserDetailsFragment } from "../../generated/graphql";

  defineProps<{ userDetails: UserDetailsFragment }>();


  const showDropdown = ref(false);
  const router = useRouter();

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };

  const logout = () => {
    // Implement your logout logic here, for example by clearing the user session data
    router.push('/login');
  };


  </script>
  
  <style scoped>
  .user-profile {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .user-profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .dropdown {
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .dropdown ul {
    list-style-type: none;
    padding: 8px 0;
    margin: 0;
  }
  
  .dropdown li {
    padding: 8px 16px;
    cursor: pointer;
  }
  
  .dropdown li:hover {
    background-color: #f2f2f2;
  }
  </style>
  