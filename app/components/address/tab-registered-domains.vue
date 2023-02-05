<template>
  <div v-loading="loading" element-loading-text="Loading..." class="flex flex-col items-end">
    <el-table ref="tableRef" size="large" row-key="date" :data="names">
      <template #empty>
        <el-empty description="No domain name registered at this address" />
      </template>
      <el-table-column prop="name" label="Name" sortable column-key="date" class-name="font-mono">
        <template #default="scope">
          <el-tag size="small">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Resolve to" align="center" sortable />
      <el-table-column prop="expires" label="Expires" align="center" sortable>
        <template #default="scope">
          <el-tag size="small" :type="'warning'" disable-transitions>{{
            scope.row.expires
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Handle" align="center" width="150" sortable>
        <template #default="scope">
          <NuxtLink :to="`/domain/${scope.row.name}`" class="mr-2.5 cursor-pointer">
            <el-button
              :type="scope.row.available ? 'success' : 'primary'"
              size="small"
              class="!w-20"
              plain
              >Renew</el-button
            ></NuxtLink
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-4 transform translate-x-4"
      layout="prev, pager, next"
      :total="names.length"
    />
  </div>
</template>

<script setup lang="ts">
import { TipError } from '~~/composables'
import API from '~~/libs/api'

const route = useRoute()
const loading = ref(false)
const names = ref([])

const account = computed(() => route.params.id)

async function getAllNames() {
  if (!account.value) return

  try {
    loading.value = true
    const _names = await API.getAllNamesOf(account.value)
    console.log('_names', _names)
    names.value = _names
  } catch (error) {
    TipError('Network Error')
  } finally {
    loading.value = false
  }
}

watch(account, getAllNames)
onMounted(getAllNames)
</script>
