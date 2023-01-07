<template>
  <div>{{jobItem.title}}</div>
  <div><label>{{ $t("message.page.jobsearch.jobItem.country") }}</label>: {{jobItem.country}}</div>
  <div><label>{{ $t("message.page.jobsearch.jobItem.city") }}</label>: {{jobItem.city}}</div>
  <router-link :to="{ name: 'job', params: { jobId: jobItem._id }}">Details</router-link>

</template>


<script setup lang="ts">
import type { Job } from "../generated/graphql.js";

defineProps<{ jobItem: Job }>();
</script>