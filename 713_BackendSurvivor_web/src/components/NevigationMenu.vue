<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <RouterLink
    v-for="item in authStore.navigationItems"
    :key="item.routeName"
    :to="{ name: item.routeName }"
    class="text-white hover:text-gray-200 font-medium transition duration-300"
    active-class="text-yellow-300 font-bold"
  >
    {{ item.name }}
  </RouterLink>
</template>
