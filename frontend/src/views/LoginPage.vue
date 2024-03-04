<template>
  <div>
    <section class="heading">
      <h1><hi-login /></h1>
      <p>Login and start setting goals</p>
    </section>

    <section class="form">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            :value="email"
            placeholder="Enter your email"
            @input="onChange"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            :value="password"
            placeholder="Enter password"
            @input="onChange"
          />
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { defineComponent, computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { HiLogin } from "oh-vue-icons/icons";
import { useAuthStore } from '../features/auth/authSlice.js';

export default defineComponent({
  components: {
    HiLogin,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      email: '',
      password: '',
    });

    // const user = computed(() => store.state.auth.user);
    const user = computed(() => {
      if (store.state.auth && store.state.auth.user) {
        return store.state.auth.user;
      } else {
        return null;
      }
    });

    // const isLoading = computed(() => store.state.auth.isLoading);
    const isLoading = computed(() => {
      if (store.state.auth && store.state.auth.isLoading) {
        return store.state.auth.isLoading;
      } else {
        return false;
      }
    });

    // const isError = computed(() => store.state.auth.isError);
    const isError = computed(() => {
      if (store.state.auth && store.state.auth.isError) {
        return store.state.auth.isError;
      } else {
        return false;
      }
    });

    // const isSuccess = computed(() => store.state.auth.isSuccess);
    const isSuccess = computed(() => {
      if (store.state.auth && store.state.auth.isSuccess) {
        return store.state.auth.isSuccess;
      } else {
        return false;
      }
    });
    // const message = computed(() => store.state.auth.message);
    const message = computed(() => {
      if (store.state.auth && store.state.auth.message) {
        return store.state.auth.message;
      } else {
        return '';
      }
    });

    // 使用 authStore 创建目标 store 实例
    const authStore = useAuthStore();

    // 在 setup 函数中定义获取目标列表和重置状态的方法，并返回给模板使用
    const login = async () => {
      await authStore.login()
    }

    const reset = () => {
      authStore.reset()
    }

    watch([isError, message], ([isError, message]) => {
      if (isError) {
        console.log(message);
      }
    });

    watch([isSuccess, user], ([isSuccess, user]) => {
      if (isSuccess || user) {
        router.replace('/');
      }
    });

    const onChange = (e) => {
      state[e.target.name] = e.target.value;
    };

    const onSubmit = () => {
      const userData = {
        email: state.email,
        password: state.password,
      };
      login(userData); // 调用 login 方法
      store.dispatch('login',userData);
    };

    const onUnmount = () => {
      reset();
      store.dispatch('reset');
    };

    return {
      email: state.email,
      password: state.password,
      isLoading,
      onChange,
      onSubmit,
      onUnmount,
    };
  }
});
</script>