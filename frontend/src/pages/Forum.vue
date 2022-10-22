<template>
    here comes a Forum
    <input type="text" name="title" placeholder="title" v-model="title"/>
    <input type="text" placeholder="content" v-model="content"/>
    <button @click="createQuestion()">raise question</button>

    <ul v-if="result && result.questionDetail">     
            {{ result.questionDetail.title }} {{ result.questionDetail.content }}   
    </ul>
</template>


<script setup lang="ts">
import { watchEffect, ref} from 'vue'
import { reactive } from 'vue';
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useMutation } from '@vue/apollo-composable'
import { QuestionDetail, CreateQuestion } from "../graphql/queries";
import type { QuestionDetailQuery, CreateQuestionMutation } from "../generated/graphql";
import type { QuestionDetailQueryVariables, CreateQuestionMutationVariables } from "../generated/graphql";

const questionDetailQueryVariables: QuestionDetailQueryVariables = reactive({questionId: '6353aa5d7e47559281806133'})
const { result, loading, error } = useQuery<QuestionDetailQuery, QuestionDetailQueryVariables>(QuestionDetail, questionDetailQueryVariables);

watchEffect(() => {
    console.log(result.value)
})

let content = ref('')
let title = ref('')


watchEffect(() => {
console.log("title: " + title.value + " content: " + content.value)
})

// createQuestion
let createQuestionMutationVariables: CreateQuestionMutationVariables = reactive({userId: '6353aa5d7e47559281806133', content: content.value, title: title.value})

const { mutate: createQuestion } = useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestion, () => ({
    variables:  {
        userId: '6353aa5d7e47559281806133', content: content.value, title: title.value
    }
}))


</script>