<template>
  <p>Is this working</p>
  <div>{{jobItem.title}}</div>
  <div><label>{{ $t("message.page.jobsearch.jobItem.country") }}</label>: {{jobItem.country}}</div>
</template>


<script setup lang="ts">
import type { Job } from "../generated/graphql.js";

const props = defineProps<{ jobItem: Job }>();
</script>
