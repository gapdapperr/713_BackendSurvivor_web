<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  try {
    authStore.logout()
    router.push({ name: 'landing-view' })
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
    >
      <img
        :src="
          authStore.user?.profile ||
          'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
        "
        :alt="authStore.currentUserName"
        class="h-10 w-10 rounded-full object-cover border-2 border-white"
      />
      <span class="font-medium text-white">{{ authStore.currentUserName }}</span>
      <ChevronDownIcon class="h-5 w-5 text-white" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <!-- Navigation Items -->
        <MenuItem
          v-for="item in authStore.navigationItems"
          :key="item.routeName"
          v-slot="{ active }"
        >
          <router-link
            :to="{ name: item.routeName }"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm',
            ]"
          >
            {{ item.name }}
          </router-link>
        </MenuItem>

        <!-- Divider -->
        <div class="h-px bg-gray-200 my-1"></div>

        <!-- Logout Button -->
        <MenuItem v-slot="{ active }">
          <button
            @click="handleLogout"
            :class="[
              active ? 'bg-gray-100' : '',
              'block w-full text-left px-4 py-2 text-sm text-red-700',
            ]"
          >
            ออกจากระบบ
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
