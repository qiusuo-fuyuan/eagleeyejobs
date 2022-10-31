<template>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <p> Questions Details:</p>
    <ul v-if="result && result.questionDetail">
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


// details
const questionDetailQueryVariables: QuestionDetailQueryVariables = reactive({questionId: '6353aa5d7e47559281806133'})
const { result, loading, error } = useQuery<QuestionDetailQuery, QuestionDetailQueryVariables>(QuestionDetail, questionDetailQueryVariables);

watchEffect(() => {
    console.log(result.value)
})


</script>