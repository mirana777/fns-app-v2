<template>
  <div class="custom-container flex-center h-18 py-2">
    <Logo />
    <HeaderNavs v-if="$route.path == '/'" />
    <HeaderSearch v-if="$route.path !== '/'" class="mx-10 flex-1" />
    <ConnectWallet class="ml-auto" />
  </div>
</template>
