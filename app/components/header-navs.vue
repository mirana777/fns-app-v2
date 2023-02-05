<template>
  <ul class="self-stretch flex ml-10 list-none text-[#B7B7B7] text-lg font-light">
    <li class="cursor-pointer transition hover:text-primary flex-center">
      <a href="https://wallaby.network/#faucet" target="_blank">Faucet</a>
    </li>
    <template v-for="nav in navs" :key="nav.label">
      <li
        class="flex-center cursor-pointer capitalize ml-10 transition hover:text-primary"
        :class="{ 'text-primary border-b-2 border-current': nav.path === $route.path }"
      >
        <NuxtLink :to="nav.path" class="">{{ nav.label }}</NuxtLink>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useAccountStore } from '~~/store'

const accountStore = useAccountStore()
const navs = computed(() => {
  const account = accountStore.$state.account
  if (accountStore.connected) {
    return [
      { label: 'Search', path: '/' },
      { label: 'My Domains', path: `/address/${account}` },
      { label: 'Favourites', path: '/favourite' },
      { label: 'About', path: '/faq' }
    ]
  }
  return [
    { label: 'Favourites', path: '/favourite' },
    { label: 'About', path: '/faq' }
  ]
})
</script>
