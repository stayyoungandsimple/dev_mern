<template>
  <div>
    <section class="heading">
      <h1>
        <fa-user-alt /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section class="form">
      <form @submit="onSubmit">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            :value="formData.name"
            placeholder="Enter your name"
            @input="onChange"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            :value="formData.email"
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
            :value="formData.password"
            placeholder="Enter password"
            @input="onChange"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password2"
            name="password2"
            :value="formData.password2"
            placeholder="Confirm password"
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
import { FaUserAlt } from 'oh-vue-icons/icons';
import { ref, watch } from 'vue';
import { useAuthStore } from '@/features/auth/authSlice';
import { useStore } from 'vuex';

export default {
  components: {
    FaUserAlt,
  },
  setup() {
    const formData = ref({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
    const store = useStore();
    const { name, email, password, password2 } = formData;
    // 使用 authStore 创建目标 store 实例
    const authStore = useAuthStore();

    // 在 setup 函数中定义获取目标列表和重置状态的方法，并返回给模板使用
    const register = async (name, email, password) => {
      await authStore.register( name, email, password )
    }

    const reset = () => {
      authStore.reset()
    }

    const onChange = (e) => {
      formData.value[e.target.name] = e.target.value;
    };

    const onSubmit = (e) => {
      e.preventDefault();

      if (password !== password2) {
        console.log('Passwords do not match');
      } else {
        const userData = {
          name,
          email,
          password,
        };
        register(userData); // 调用 register 方法
        store.dispatch('register',userData);
      }
    };

    watch(
      () => authStore.value,
      (newState) => {
        if (newState.isError) {
          console.log(newState.message);
        }

        if (newState.isSuccess || newState.user) {
          navigate('/');
        }
        reset();
        store.dispatch('reset');
      }
    );

    return {
      formData,
      onChange,
      onSubmit,
    };
  },
};
</script>