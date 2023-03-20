<template>
  <div class="header">

    <div class="header_topright">
      <router-link id="button_login" to="/login">{{ $t("message.header.menu.login") }}</router-link>
      <router-link id="button_registor" to="/registor">{{ $t("message.header.menu.registor") }}</router-link>
      <LanguagePicker />
    </div>
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

<script setup>
import LanguagePicker from "./LanguagePicker.vue";
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
</style>