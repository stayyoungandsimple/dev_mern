<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">GoalSetter</router-link>
    </div>
    <ul>
      <li v-if="user">
        <button class="btn" @click="onLogout">
          <HiLogout /> Logout
        </button>
      </li>
      <div v-else>
        <li>
          <router-link to="/login">
            <HiLogin /> Login
          </router-link>
        </li>
        <li>
          <router-link to="/register">
            <FaUserAlt /> Register
          </router-link>
        </li>
      </div>
    </ul>
  </header>
</template>

<script>
import { HiLogin, HiLogout, FaUserAlt } from 'oh-vue-icons/icons'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../features/auth/authSlice'

export default defineComponent({
  components: {
    HiLogin,
    HiLogout,
    FaUserAlt,
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const onLogout = () => {
      authStore.logout()
      authStore.reset()
      router.push('/')
    }

    return {
      user: authStore.user,
      onLogout,
    }
  },
})
</script>
