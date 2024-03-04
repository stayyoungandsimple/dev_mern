<template>
     <section class='heading'>
        <h1>Welcome {{ user && user.name }}</h1>
        <p>Goals Dashboard</p>
      </section>

      <goal-form />

      <section class='content'>
        <div v-if='isLoading' />

        <template v-else>
          <div v-if='goals.length > 0' class='goals'>
            <goal-item v-for='goal in goals' :key='goal._id' :goal='goal' />
          </div>

          <h3 v-else>You have not set any goals</h3>
        </template>
      </section>
  </template>
  
  <script>
import { defineComponent, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import GoalForm from '@/components/GoalForm.vue';
import GoalItem from '@/components/GoalItem.vue';

import { useGoalStore  } from '@/features/goals/goalSlice'; // 导入 createGoal, getGoals 和 reset

export default defineComponent({
  components: {
    GoalForm,
    GoalItem,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    // const user = computed(() => store.state.auth.user);
    const user = computed(() => {
      if (store.state.auth && store.state.auth.user) {
        return store.state.auth.user;
      } else {
        return null;
      }
    });
    // const goals = computed(() => store.state.goals.goals);
    const goals = computed(() => {
      if (store.state.auth && store.state.auth.goals) {
        return store.state.auth.goals;
      } else {
        return [];
      }
    });
    // const isLoading = computed(() => store.state.goals.isLoading);
    const isLoading = computed(() => {
      if (store.state.auth && store.state.auth.isLoading) {
        return store.state.auth.isLoading;
      } else {
        return false;
      }
    });

    // const isError = computed(() => store.state.goals.isError);
    const isError = computed(() => {
      if (store.state.auth && store.state.auth.isError) {
        return store.state.auth.isError;
      } else {
        return false;
      }
    });
    // const message = computed(() => store.state.goals.message);
    const message = computed(() => {
      if (store.state.auth && store.state.auth.message) {
        return store.state.auth.message;
      } else {
        return '';
      }
    });
    // 使用 useGoalStore 创建目标 store 实例
    const goalStore = useGoalStore();

    // 在 setup 函数中定义获取目标列表和重置状态的方法，并返回给模板使用
    const getGoals = async () => {
      await goalStore.getGoals()
    }

    const reset = () => {
      goalStore.reset()
    }

    onMounted(async () => { // 改为 async 函数
      if (isError.value) {
        console.log(message.value)
      }

      if (!user.value) {
        router.replace('/login');
      }
      getGoals();
      await store.dispatch('getGoals'); // 调用 getGoals 需要加上 await

      return () => {
        reset()
        store.dispatch('reset');
      };
    });

    return {
      user,
      goals,
      isLoading,
      isError,
      message,
    };
  }
})
  </script>
  