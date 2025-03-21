<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
    >
      <img
        :src="authStore.user?.profile || '/user.png'"
        :alt="authStore.currentUserName"
        class="h-10 w-10 rounded-full object-cover border-2 border-white"
      />
      <span class="font-medium">{{ authStore.currentUserName }}</span>
      <ChevronDownIcon class="h-5 w-5" />
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
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <RouterLink
            to="/profile"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
          >
            โปรไฟล์
          </RouterLink>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            @click="authStore.logout"
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
