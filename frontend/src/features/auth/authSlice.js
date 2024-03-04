import { defineStore } from 'pinia'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }),
  actions: {
    async register(user) {
      try {
        this.isLoading = true
        const registeredUser = await authService.register(user)
        this.user = registeredUser
        this.isSuccess = true
        return registeredUser
      } catch (error) {
        this.isError = true
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(this.message)
      } finally {
        this.isLoading = false
      }
    },
    async login(user) {
      try {
        this.isLoading = true
        const loggedInUser = await authService.login(user)
        this.user = loggedInUser
        this.isSuccess = true
        return loggedInUser
      } catch (error) {
        this.isError = true
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(this.message)
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      try {
        authService.logout()
        this.user = null
      } catch (error) {
        console.error(error)
      }
    },
    reset() {
      // 在这里重置状态
      this.isLoading = false
      this.isSuccess = false
      this.isError = false
      this.message = ''
    }
  }
})
