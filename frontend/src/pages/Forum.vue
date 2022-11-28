<template>
    <p>All Questions Lists:</p>
    <ul v-if="questions">
      <li v-for="question of questions">
       <router-link :to="{name:'question', params: {questionId: question?._id}}">{{question?.title }} {{ question?.content}} </router-link>
      </li>
    </ul>

    <p>Raise questions here:</p>
    <input type="text" name="title" placeholder="title" v-model="title"/>
    <input type="text" placeholder="content" v-model="content"/>
    <button @click="createQuestion()">raise question</button>

</template>


<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue'
import { reactive } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import { useMutation } from '@vue/apollo-composable'
import { CreateQuestion, AllQuestions } from "../graphql/queries";
import type { CreateQuestionMutation, AllQuestionsQuery } from "../generated/graphql";
import type { CreateQuestionMutationVariables } from "../generated/graphql";


// all questions
const { result: result1} = useQuery<AllQuestionsQuery>(AllQuestions);
watchEffect(() => {
    console.log(result1.value)
})
const questions = computed(() => result1.value?.allQuestions ?? [])



// createQuestion
let content = ref('')
let title = ref('')

watchEffect(() => {
console.log("title: " + title.value + " content: " + content.value)
})

let createQuestionMutationVariables: CreateQuestionMutationVariables = reactive({userId: '63133', content: content.value, title: title.value})

const { mutate: createQuestion } = useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestion, () => ({
    variables:  {
        userId: '63787c45f763a263f00c643c', 
        content: content.value, 
        title: title.value
    },
    update: (cache, { data:  createQuestion  }) => {
        let data = cache.readQuery({ query: AllQuestions })
        console.log("cache: " + cache)
        console.log("data: " + data.allQuestions)
        data = {
          ...data,
          allQuestions: [
            ...data.allQuestions,
            createQuestion,
          ],
        }
        cache.writeQuery({ query: AllQuestions, data })
      },
}))


</script>