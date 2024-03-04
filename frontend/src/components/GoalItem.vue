<template>
    <div class="goal">
      <div>{{ new Date(goal.createdAt).toLocaleString('en-US') }}</div>
      <h2>{{ goal.text }}</h2>
      <button @click="deleteGoal(goal._id)" class="close">X</button>
    </div>
  </template>
  
  <script>
  import { useGoalStore } from '../features/goals/goalSlice'
//   import { useStore } from 'pinia'
  
  export default {
    props: {
      goal: Object
    },
    setup() {
      const goalStore = useGoalStore()
    //   const store = useStore()
  
      const deleteGoal = (id) => {
        goalStore.deleteGoal(id)
      }
  
      return {
        deleteGoal
      }
    }
  }
  </script>
  