import { createStore } from 'vuex';
import { useAuthStore }  from '@/features/auth/authSlice.js';
import { useGoalStore }  from '@/features/goals/goalSlice.js';

const store = createStore({
  reducer: {
    auth: useAuthStore,
    goals: useGoalStore
  },
})

export default store

