<template>
  <div class=jobsearch>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div
      v-else
      v-for="job in result?.searchJobs?.jobs"
      :key="job?._id"
    >
      <JobSearchListItem :job-item="job" />
    </div>
  </div>
</template>

<script setup lang="ts">
import JobSearchListItem from "../components/JobSearchListItem.vue";
import { useQuery } from "@vue/apollo-composable";
import { SearchJobs } from "../graphql/queries";
import type { SearchJobsQuery } from "../generated/graphql";
import { watchEffect } from "vue";

const { result, loading, error } = useQuery<SearchJobsQuery>(SearchJobs);

watchEffect(() => {
  console.log("this is really hard to debug");
  console.log(result.value);
});
</script>