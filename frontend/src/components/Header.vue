<template>
  <div class="header">
    <nav class="header_menu">
      <ul>
        <li>
          <router-link to="/jobs">Job</router-link>
        </li>
        <li>
          <router-link to="/referral">Referral</router-link>
        </li>
        <li>
          <router-link to="/aboutUs">AboutUs</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
};
</script>