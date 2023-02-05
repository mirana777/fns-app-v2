<template>
  <div class="flex-center font-light">
    <template v-if="accountStore.connected">
      <el-tag
        disable-transitions
        effect="dark"
        :type="accountStore.rightNetwork ? 'success' : 'danger'"
        class="mr-2"
        >{{ accountStore.network }}</el-tag
      >
      {{ accountStore.shortAccount }}
    </template>
    <div
      class="flex-center bg-primary text-white rounded px-4 py-1.5 ml-4 transition cursor-pointer hover:(text-primary border-current bg-white)"
      @click="accountStore.connected ? wallet.disconnect() : wallet.connect()"
    >
      <IconLink class="mr-2" />
      {{ accountStore.connected ? 'Disconnect' : 'Connect Wallet' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { wallet } from '~/libs/wallet'
import { useAccountStore } from '~/store'
const accountStore = useAccountStore()
</script>
