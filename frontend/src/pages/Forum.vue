<template>
    <div class="div-center">
      <div style="width: 60%;">
        <p class="text-center">All Questions Lists</p>
          <div class="div-loop" v-if="questions">
            <div class="question" v-for="question of questions">
              <router-link :to="{name:'question', params: {questionId: question?._id}}">
                <p>{{question?.title }}</p>
                <p>{{ question?.content}}</p> 
                </router-link>
            </div>
          </div>
      </div>
      
      <div>
        <p class="text-center">Raise questions here</p>
        <input type="text" name="title" placeholder="title" v-model="title"/>
        <input type="text" placeholder="content" v-model="content"/>
        <button @click="createQuestion()">raise question</button>
      </div>
      
    </div>
</template>


<script setup lang="ts">
import { watchEffect, ref, watch, computed } from 'vue'
import { reactive } from 'vue';
import { useQuery, useMutation, useSubscription } from '@vue/apollo-composable'
import { CreateQuestion, AllQuestions, QuestionCreated } from "../graphql/queries";
import type { CreateQuestionMutation, AllQuestionsQuery, QuestionCreatedSubscription } from "../generated/graphql";
import type { CreateQuestionMutationVariables } from "../generated/graphql";



// subscriptions
const { result: result2 } = useSubscription<QuestionCreatedSubscription>(QuestionCreated);
  watchEffect(() => {
    console.log("subscription value: ", result2.value)
})

const subscriptionData = computed(() => result2.value?.questionCreated);
console.log(subscriptionData, result2)



// all questions
const { result: result1, subscribeToMore } = useQuery<AllQuestionsQuery>(AllQuestions, {
  subscribeToMore: { 
        document: useSubscription<QuestionCreatedSubscription>(QuestionCreated),
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          return {
            allQuestions: [
              ...prev.allQuestions,
              subscriptionData.data.questionCreated
            ]
          }
        }
      }
    }
  )

watchEffect(() => {
    console.log("all questions query: ", result1.value)
})
const questions = computed(() => result1.value?.allQuestions ?? [])



// createQuestion
let content = ref('')
let title = ref('')

watchEffect(() => {
// console.log("title: " + title.value + " content: " + content.value)
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



<style>
  .div-center {
    margin: 50px auto;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    border: 1px solid black;
  }
  .text-center {
    text-align: center;
  }
  .div-loop {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .question{
    width: 80%;
    padding: 10px 30px;
    margin: 10px 0;
    background: lightgrey;
    border: 1px solid grey;
    border-radius: 5px;
  }

  a { 
    text-decoration: none;
  }

  a:hover {
    color: blueviolet;
  }

</style>