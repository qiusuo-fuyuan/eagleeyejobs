<template>
  <div>{{jobItem.title}}</div>
  <div><label>{{ $t("message.page.jobsearch.jobItem.country") }}</label>: {{jobItem.country}}</div>
  <div><label>{{ $t("message.page.jobsearch.jobItem.city") }}</label>: {{jobItem.city}}</div>
</template>


<script setup lang="ts">
import type { Job } from "../generated/graphql.js";

const props = defineProps<{ jobItem: Job }>();
</script>