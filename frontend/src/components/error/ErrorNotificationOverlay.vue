<template>
    <div v-if="showOverlay" class="error-notification-overlay">
      <div class="error-notification-overlay-content">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  
</script>
  
<style>
  .error-notification-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .error-notification-overlay-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
</style>
  