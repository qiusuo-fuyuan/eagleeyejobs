<template>
  <div class="header">
    <LanguagePicker />
      <ul class=header_menu>
        <li>
          <router-link to="/jobs">{{ $t("message.header.menu.job") }}</router-link>
        </li>
        <li>
          <router-link to="/referral">{{ $t("message.header.menu.referral") }}</router-link>
        </li>
        <li>
          <router-link to="/aboutUs">{{ $t("message.header.menu.aboutUs") }}</router-link>
        </li>
      </ul>
  </div>
</template>

<script setup>
import LanguagePicker from "./LanguagePicker.vue";
</script>

<style lang="scss">

.header_menu {
  list-style-type: none;
  display: flex; /* or inline-flex */
  justify-content: flex-end;

  li {
    flex-basis: 40rem
  }
}
</style>