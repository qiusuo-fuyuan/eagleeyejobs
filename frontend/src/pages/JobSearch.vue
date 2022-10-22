<template>
  <div class=jobsearch>
    <div class="jobsearch-input">
      <input type="search" id="job-search" placeholder="Search Job" @keyup.enter="onSubmitUserInput($event)"/>
    </div>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div class="jobsearch-item-card"
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
import type { SearchJobsQueryVariables } from "../generated/graphql"
import { reactive, watchEffect } from "vue";

const searchJobsQueryVariables: SearchJobsQueryVariables = reactive({userInput: "", pageNumber: 0})
const { result, loading, error } = useQuery<SearchJobsQuery, SearchJobsQueryVariables>(SearchJobs, searchJobsQueryVariables);

function onSubmitUserInput(event: Event) {
  searchJobsQueryVariables.userInput = (event.target as HTMLInputElement).value
}

watchEffect(() => {
  console.log("result has being changed")
})

</script>

<style lang="scss">
  .jobsearch {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center; 

    .jobsearch-item-card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 30%;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .jobsearch-item-card:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
  }
</style>