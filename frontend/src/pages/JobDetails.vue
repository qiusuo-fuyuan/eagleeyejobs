<template>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div>{{result?.jobDetail?.title}}</div>
    <div><label>{{ $t("message.page.jobsearch.jobItem.country") }}</label>: {{result?.jobDetail?.country}}</div>
  <div><label>{{ $t("message.page.jobsearch.jobItem.city") }}</label>: {{result?.jobDetail?.city}}</div>
    <div>{{result?.jobDetail?.description}}</div>

</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { JobDetail } from "../graphql/queries";
import type { JobDetailQuery } from "../generated/graphql";
import type { JobDetailQueryVariables } from "../generated/graphql"
import { useRoute } from 'vue-router';

const route = useRoute();  

const jobDetailQueryVariables: JobDetailQueryVariables = { jobId: route.params.jobId as string }
const { result, loading, error } = useQuery<JobDetailQuery, JobDetailQueryVariables>(JobDetail, jobDetailQueryVariables);

</script>

<style lang="scss">

</style>