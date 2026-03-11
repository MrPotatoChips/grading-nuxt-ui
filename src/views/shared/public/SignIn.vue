<template>
  <div
    class="relative overflow-hidden flex min-h-screen items-center justify-center p-4 background"
  >
    <UCard
      class="w-full max-w-sm pb-8 px-6 pt-4 shadow-2xl rounded-2xl border-0"
      hoverable
    >
      <div class="flex justify-end mb-4">
        <UColorModeButton />
      </div>
      <div class="flex flex-col items-center mb-8">
          <UIcon name="i-lucide-university" class="size-14 text-secondary-300 dark:text-secondary-300" />
        <h2
          class="text-3xl font-bold text-gray-600 dark:text-white mb-2"
        >
          CGS
        </h2>
        <p class="text-gray-400 font-semibold text-sm">
          College Grading System
        </p>
      </div>
      <UForm
        ref="formSignIn"
        class="space-y-6"
        :schema="validationSignIn"
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

// Role + ComponentName format required by project rules
export default {
  name: 'SharedAuthSignIn',
  data () {
    return {
      auth: useAuth(),
      // UI state
      state: {
        busy: false,
        passwordVisible: false
      },
      // validation schema
      validationSignIn: yup.object().shape({
        username: yup.string().required(),
        password: yup.string().min(6).required(),
        rememberMe: yup.boolean()
      }),
      // form model
      formSignIn: {
        username: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    // Use promise style (.then/.catch) per agent instructions for components
    onSubmit () {
      this.state.busy = true

      SSharedAuth.signIn(this.formSignIn).then(
        ({ data: { token } }) => {
            // Component should only set local auth state. Delegate routing
            // handler (e.g. an auth store action or axios interceptor).
            if (token) {
              this.auth.setToken(token)

              SSharedAuth.getCurrentUser().then(
                ({ data: { role } }) => {
                  this.$router.push({
                    name: `${role?.role_code}.dashboard`
                  }, () => {
                    this.state.busy = false
                  })
                }
              )
            }
          }
        )
        .catch(({ message }) => {
          this.state.busy = false
          if (message && message.errors) {
            const validationError = Object.keys(message.errors).map(name => ({
              name,
              message: message.errors[name][0]
            }))
            this.$refs.formSignIn.setErrors(validationError)
          }
        })
    }
  }
}
</script>

<style scoped>

.background {
  /*
    * Rice field with tree image featuring:
    * - Clouds: #F9F8F1
    * - Sky: #00A5FE
    * - Rice field: #58DC00 and #005032
    */
  background-image:
    linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(248, 250, 248, 0.1)),
    url('../../../assets/images/backgrounds/farm.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark .background {
  background-image:
    linear-gradient(135deg, rgba(146, 146, 146, 0.50), rgba(179, 179, 179, 0.0)),
    url('../../../assets/images/backgrounds/farm-evening.png');
}

/* Custom styles for enhanced look */
.UCard {
  background: rgba(255, 255, 255, 0.95);
}

/* Futuristic vibes */
.reverse {
  animation-direction: reverse;
}

@keyframes linearShift {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(5%, 3%, 0) scale(1.05); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

.animate-linearShift {
  animation: linearShift 14s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(0, -14px, 0) rotate(2deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 9s ease-in-out infinite;
}

.animate-float-slower {
  animation: float 12s ease-in-out infinite;
}

.floating-item {
  position: absolute;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
}

.product-card {
  position: relative;
  display: grid;
  place-items: center;
  height: 72px;
  width: 72px;
  border-radius: 16px;
  background: linear-linear(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.5);
}

.product-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-linear(135deg, rgba(59,130,246,0.35), rgba(236,72,153,0.35));
  -webkit-mask: linear-linear(#000 0 0) content-box, linear-linear(#000 0 0);
  mask: linear-linear(#000 0 0) content-box, linear-linear(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
}

.product-card .price {
  position: absolute;
  bottom: -10px;
  right: -6px;
  background: rgba(17,24,39,0.85);
  color: #fff;
  font-size: 10px;
  padding: 4px 6px;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
