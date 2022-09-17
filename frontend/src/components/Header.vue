<template>
   <div class="header">
     <label>Jobs</label>
     <label>Internal Recommendation</label>
     <label>Membership</label>
     <label>Community</label>
     <label>About Us</label>
   </div>

</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Headerc extends Vue {
  // Declared as component data
  message = 'Vue.js With NodeJS - Typescript'
}
</script>