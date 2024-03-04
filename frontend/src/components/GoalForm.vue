<template>
    <section class="form">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            v-model="text"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  </template>
  
  <script>
  import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const text = ref('');
    const store = useStore();
  
    const onSubmit = () => {
      store.dispatch('createGoal', text.value);
      text.value = '';
    };
  
    return {
      text,
      onSubmit
    };
  }
}
  </script>
  