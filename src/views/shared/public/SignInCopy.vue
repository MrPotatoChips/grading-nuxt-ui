<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-primary-100 p-4"
  >
    <UCard
      class="w-full max-w-md p-8 shadow-2xl rounded-2xl border-0"
      hoverable
    >
      <div class="flex flex-col items-center mb-8">
        <UAvatar
          size="large"
          class="mb-4 bg-primary-100 text-primary-600 p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </UAvatar>
        <h2
          class="text-3xl font-extrabold text-gray-800 mb-2"
        >
          Welcome Back
        </h2>
        <p class="text-gray-500 text-sm">Sign in to your account</p>
      </div>
      <UForm
        ref="formSignIn"
        class="space-y-6"
        :schema="formSignInValidation"
        :state="formSignIn"
        @submit="onSubmit"
      >
        <UFormField
          label="Username"
          name="username"
          required
        >
          <UInput
            v-model="formSignIn.username"
            placeholder="enter username here"
            class="w-full"
            :disabled="state.busy"
          />
        </UFormField>
        <UFormField
          label="Password"
          name="password"
          required
        >
          <UInput
            v-model="formSignIn.password"
            placeholder="enter password here"
            class="w-full"
            :disabled="state.busy"
            :type="state.passwordVisible ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="state.passwordVisible ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="state.passwordVisible ? 'Hide password' : 'Show password'"
                :aria-pressed="state.passwordVisible"
                aria-controls="password"
                @click="state.passwordVisible = !state.passwordVisible"
              />
            </template>
          </UInput>
        </UFormField>
        <UButton
          block
          type="submit"
          :loading="state.busy"
        >
          {{ state.busy ? 'Signing In' : 'Sign In' }}
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script>
import * as yup from 'yup'
import { SSharedAuth } from '@/services/shared'
import { useAuth } from '@/stores/auth.store'

export default {
  name: 'VSharedAuthSignIn',
  data () {
    return {
      auth: useAuth(),
      state: {
        busy: false,
        passwordVisible: false
      },
      formSignInValidation: yup.object().shape({
        username: yup.string().required(),
        password: yup.string().min(6).required(),
        rememberMe: yup.boolean()
      }),
      formSignIn: {
        username: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    onSubmit () {
      this.state.busy = true
      SSharedAuth.signIn(this.formSignIn).then(
        ({ data: { token, role } }) => {
          this.auth.setToken(token)

          this.$router.push({
            name: `${role}.dashboard`
          })
        }
      ).catch(
        ({ message }) => {
          if (message && message?.errors) {
            const validationError = Object.keys(message.errors).map(
              name => ({
                name,
                message: message.errors[name][0]
              })
            )
            this.$refs.formSignIn.setErrors(
              validationError
            )
          }
        }
      ).finally(() => {
        this.state.busy = false
      })
    }
  }
}
</script>

<style scoped>
/* Custom styles for enhanced look */
.UCard {
  background: rgba(255, 255, 255, 0.95);
}
</style>
