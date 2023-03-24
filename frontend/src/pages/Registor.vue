<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5">Register</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" :rules="[rules.validEmail]" label="Email"></v-text-field>
              <v-text-field v-model="companyName" :rules="[rules.required]" label="Company Name"></v-text-field>
              <v-btn @click="registerNewUser()" color="primary">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RegisterNewUser } from '../graphql/queries';
import { useMutation } from '@vue/apollo-composable';

import type { RegisterNewUserMutationVariables } from '../generated/graphql';
import type { RegisterNewUserMutation } from '../generated/graphql';
import { useRouter } from 'vue-router';


const email = ref('');
const companyName = ref('');
const router = useRouter();

// Here you can add your logic to register the user with the email and companyName data
// You can use a backend framework or library to handle this logic

const { mutate: registerNewUser } = useMutation<RegisterNewUserMutation, RegisterNewUserMutationVariables>(RegisterNewUser, () => ({
  variables: {
    userId: '',
    email: email.value,
    companyName: companyName.value
  },
  update: (cache, { data: resdata }) => {
    const { registerNewUser: newUser } = resdata;
    console.log('registerNewUser:', newUser, cache, resdata)
    if (newUser.email) {
      
      router.push({ name: 'login' });
    }
  }
}));

console.log(`Registered user with email: ${email.value} and company name: ${companyName.value}`);

// Clear the form
// email.value = '';
// companyName.value = '';

const rules = {
  validEmail: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Please enter a valid email address'
  },
  required: (value) => !!value || 'This field is required',

}

</script>
