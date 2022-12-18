<template>
  <div class="div-center">
    <div>
      <p v-if="error">Something went wrong...</p>
      <p v-if="loading">Loading...</p>
      <p class="text-center"> Questions Details</p>

      <div class="div-loop" v-if="result && result.questionDetail">
        <div class="question" >
          <p>QuestionId: {{result.questionDetail._id }} </p>
          <p>Title:{{ result.questionDetail.title }} </p>
         <p>Content:{{ result.questionDetail.content}} </p>
        </div>
        
      </div>

      
        <div  class="question" >
          <p class="text-center"> Answers</p>
          <p v-if="result.questionDetail.answers">
            <p v-for="answer of result.questionDetail.answers"> content:{{answer?.content}}</p>
          </p>
        </div>
        
    </div>
   
        

     <!-- add answer to question -->
     <div>
      <p class="text-center">Add answer</p>
      <input type="content" name="content" placeholder="type answer here" v-model="content"/>
      <button @click="createAnswer()">raise answer</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { QuestionDetail, CreateAnswer } from "../graphql/queries";
import type { QuestionDetailQuery, CreateAnswerMutation } from "../generated/graphql";
import type { QuestionDetailQueryVariables, CreateAnswerMutationVariables } from "../generated/graphql";
import { useRoute } from 'vue-router';
// details
const route = useRoute(); 
const questionDetailQueryVariables: QuestionDetailQueryVariables = { questionId: route.params.questionId as string }
const { result, loading, error } = useQuery<QuestionDetailQuery, QuestionDetailQueryVariables>(QuestionDetail, questionDetailQueryVariables);
watchEffect(() => {
    console.log(result.value)   // result: reactive variable
})

// create answer
let content = ref('')

watchEffect(() => {
console.log("content: " + content.value, "questionId: " + route.params.questionId )
})

const { mutate: createAnswer } = useMutation<CreateAnswerMutation, CreateAnswerMutationVariables>(CreateAnswer, () => ({
    variables:  {
        questionId: route.params.questionId as string,
        content: content.value,
        userId: '63787c45f763a263f00c643c'  
    },
}))

</script>

<style>
.div-loop {
  width: 100%;
}

</style>