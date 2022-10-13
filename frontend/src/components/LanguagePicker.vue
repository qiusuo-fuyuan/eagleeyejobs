<template>
    <div class="language_picker">
      <select v-model="$root.$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
 const langs =  ['en', 'zh']
  </script>

<style>
.language_picker {
  display: flex;
  justify-content: flex-end;
}
</style>