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

/*here we have to use a function. If we do not use a function, then the variables will become one constant
This constant is created for the first time, and stored internally inside userMutation. If the
content or title change, then we do not have to update
*/
const { mutate: createQuestion } = useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestion, () => ({
    variables:  {
        content: content.value, 
        title: title.value
    },
    update: (cache, { data:  createQuestionReturn }) => {
        let data = cache.readQuery({ query: AllQuestions })
        console.log("cache: " + cache)
        console.log("data: " + data.allQuestions)
        data = {
          ...data,
          allQuestions: [
            ...data.allQuestions,
            createQuestionReturn,
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