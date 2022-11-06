<template>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <p> Questions Details:</p>
    <ul v-if="result && result.questionDetail">
       {{result.questionDetail._id }} 
     {{ result.questionDetail.title }} {{ result.questionDetail.content}} 
    </ul>
</template>


<script setup lang="ts">
import { watchEffect} from 'vue'
import { reactive } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import { QuestionDetail } from "../graphql/queries";
import type { QuestionDetailQuery } from "../generated/graphql";
import type { QuestionDetailQueryVariables } from "../generated/graphql";
import { useRoute } from 'vue-router';


// details
const route = useRoute(); 

const questionDetailQueryVariables: QuestionDetailQueryVariables = { questionId: route.params.questionId as string }
const { result, loading, error } = useQuery<QuestionDetailQuery, QuestionDetailQueryVariables>(QuestionDetail, questionDetailQueryVariables);

watchEffect(() => {
    console.log(result.value)
})


</script>