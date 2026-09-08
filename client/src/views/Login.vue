<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[var(--bg)]">
    <div class="w-full max-w-md space-y-8 p-8 rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]/40 shadow-sm backdrop-blur-sm">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <router-link to="/" class="inline-flex items-center gap-1.5 font-heading text-2xl font-bold text-[var(--text-h)]">
          <span class="text-brand-primary">✦</span>
          <span>Anime<span class="text-brand-primary">Lounge</span></span>
        </router-link>
        <h1 class="text-2xl font-heading font-bold text-[var(--text-h)] tracking-tight">Sign in to your account</h1>
        <p class="text-xs text-[var(--text)]">
          Track watchlists, vote in seasonal polls, and post in the forums.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[var(--text-h)] mb-1.5" for="username">
            Username or Email
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            autocomplete="username"
            placeholder="e.g. spike_spiegel"
            class="w-full px-3.5 py-2.5 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-h)] placeholder:text-[var(--text)]/60 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-[var(--text-h)]" for="password">
              Password
            </label>
            <a href="#" class="text-[11px] text-brand-primary hover:underline font-medium">Forgot password?</a>
          </div>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
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
          <span>{{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}</span>
        </button>
      </form>

      <!-- Footer CTA -->
      <div class="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text)]">
        Don't have an account yet?
        <router-link to="/register" class="font-semibold text-brand-primary hover:underline ml-1">
          Create an account
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
  password: '',
})

const handleSubmit = async () => {
  try {
    await authStore.loginAction(form)
    router.push('/')
  } catch {
    // Toast notification is managed by authStore
  }
}
</script>