<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[var(--bg)]">
    <div class="w-full max-w-lg space-y-8 p-8 rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]/40 shadow-sm backdrop-blur-sm">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <router-link to="/" class="inline-flex items-center gap-1.5 font-heading text-2xl font-bold text-[var(--text-h)]">
          <span class="text-brand-primary">✦</span>
          <span>Anime<span class="text-brand-primary">Lounge</span></span>
        </router-link>
        <h1 class="text-2xl font-heading font-bold text-[var(--text-h)] tracking-tight">Create your account</h1>
        <p class="text-xs text-[var(--text)]">
          Join the lounge to rate anime, review seasonal premieres, and join the debate.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- First & Last Name row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-[var(--text-h)] mb-1.5" for="firstName">
              First Name
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              placeholder="Edward"
              class="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] placeholder:text-[var(--text)]/60 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-[var(--text-h)] mb-1.5" for="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              placeholder="Elric"
              class="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] placeholder:text-[var(--text)]/60 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-[var(--text-h)] mb-1.5" for="username">
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            autocomplete="username"
            placeholder="fullmetal_alchemist"
            class="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] placeholder:text-[var(--text)]/60 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[var(--text-h)] mb-1.5" for="email">
            Email Address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="edward@statealchemist.gov"
            class="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] placeholder:text-[var(--text)]/60 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[var(--text-h)] mb-1.5" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            autocomplete="new-password"
            placeholder="Minimum 8 characters"
            class="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] placeholder:text-[var(--text)]/60 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full py-2.5 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 text-white font-medium text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          <svg
            v-if="authStore.isLoading"
            class="animate-spin h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>{{ authStore.isLoading ? 'Creating account...' : 'Create Account' }}</span>
        </button>
      </form>

      <!-- Footer CTA -->
      <div class="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text)]">
        Already registered?
        <router-link to="/login" class="font-semibold text-brand-primary hover:underline ml-1">
          Sign in instead
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const router = useRouter()
const authStore = useAuth()

const form = reactive({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    await authStore.registerAction(form)
    router.push('/login')
  } catch {
    // Toast notification is managed by authStore
  }
}
</script>