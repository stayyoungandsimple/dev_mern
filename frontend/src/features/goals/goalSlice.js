import { defineStore } from 'pinia'
import goalService from './goalService'

export const useGoalStore = defineStore('goals', {
  state: () => ({
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }),
  actions: {
    async createGoal(goalData) {
      try {
        this.isLoading = true
        const token = this.$parent.auth.user.token
        const goal = await goalService.createGoal(goalData, token)
        this.goals.push(goal)
        this.isSuccess = true
      } catch (error) {
        this.isError = true
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      } finally {
        this.isLoading = false
      }
    },
    async getGoals() {
      try {
        this.isLoading = true
        const token = this.$parent.auth.user.token
        this.goals = await goalService.getGoals(token)
        this.isSuccess = true
      } catch (error) {
        this.isError = true
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      } finally {
        this.isLoading = false
      }
    },
    async deleteGoal(id) {
      try {
        this.isLoading = true
        const token = this.$parent.auth.user.token
        await goalService.deleteGoal(id, token)
        this.goals = this.goals.filter((goal) => goal._id !== id)
        this.isSuccess = true
      } catch (error) {
        this.isError = true
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      } finally {
        this.isLoading = false
      }
    },
    reset() {
      // 在这里重置状态
      this.goals = []
      this.isError = false
      this.isSuccess = false
      this.isLoading = false
      this.message = ''
    },
  }
})

