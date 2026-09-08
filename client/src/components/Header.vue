<template>
  <header class="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <router-link 
        to="/" 
        class="flex items-center gap-2 font-heading font-bold text-xl sm:text-2xl text-[var(--text-h)] tracking-tight hover:opacity-90 transition-opacity"
      >
        <span class="text-brand-primary text-2xl leading-none">✦</span>
        <span>Anime<span class="text-brand-primary">Lounge</span></span>
      </router-link>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center gap-1 font-body text-sm font-medium">
        <router-link
          to="/"
          class="px-3.5 py-1.5 rounded-lg transition-colors"
          :class="isActive('/') ? 'text-brand-primary bg-brand-primary/10 font-semibold' : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]'"
        >
          Home
        </router-link>
        <router-link
          to="/browse"
          class="px-3.5 py-1.5 rounded-lg transition-colors"
          :class="isActive('/browse') ? 'text-brand-primary bg-brand-primary/10 font-semibold' : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]'"
        >
          Browse
        </router-link>
        <router-link
          to="/forum"
          class="px-3.5 py-1.5 rounded-lg transition-colors"
          :class="isActive('/forum') ? 'text-brand-primary bg-brand-primary/10 font-semibold' : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)]'"
        >
          Forums
        </router-link>
      </nav>

      <!-- Auth Actions (Desktop) -->
      <div class="hidden md:flex items-center gap-3">
        <router-link
          to="/login"
          class="px-4 py-2 text-sm font-medium font-body rounded-lg text-[var(--text-h)] hover:bg-[var(--code-bg)] border border-transparent hover:border-[var(--border)] transition-all"
        >
          Log in
        </router-link>
        <router-link
          to="/register"
          class="px-4 py-2 text-sm font-semibold font-body rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white shadow-sm hover:shadow transition-all"
        >
          Register
        </router-link>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button
        type="button"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden p-2 rounded-lg text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--code-bg)] focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden border-b border-[var(--border)] bg-[var(--bg)] px-4 pt-2 pb-5 space-y-3"
      >
        <nav class="flex flex-col space-y-1">
          <router-link
            to="/"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-base font-medium transition-colors"
            :class="isActive('/') ? 'text-brand-primary bg-brand-primary/10' : 'text-[var(--text)] hover:bg-[var(--code-bg)]'"
          >
            Home
          </router-link>
          <router-link
            to="/browse"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-base font-medium transition-colors"
            :class="isActive('/browse') ? 'text-brand-primary bg-brand-primary/10' : 'text-[var(--text)] hover:bg-[var(--code-bg)]'"
          >
            Browse
          </router-link>
          <router-link
            to="/forum"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-base font-medium transition-colors"
            :class="isActive('/forum') ? 'text-brand-primary bg-brand-primary/10' : 'text-[var(--text)] hover:bg-[var(--code-bg)]'"
          >
            Forums
          </router-link>
        </nav>

        <div class="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
          <router-link
            to="/login"
            @click="isMobileMenuOpen = false"
            class="w-full text-center py-2 text-sm font-medium rounded-lg text-[var(--text-h)] bg-[var(--code-bg)] border border-[var(--border)]"
          >
            Log in
          </router-link>
          <router-link
            to="/register"
            @click="isMobileMenuOpen = false"
            class="w-full text-center py-2 text-sm font-semibold rounded-lg bg-brand-primary text-white"
          >
            Register
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const isActive = (path) => {
  return route.path === path
}
</script>