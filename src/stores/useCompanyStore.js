import { defineStore } from 'pinia'
import { ref } from 'vue'

const STOCK_API = 'https://taiwan-stock-api.kuofong-engineer.workers.dev'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref([])
  const loading = ref(false)
  const loaded = ref(false)

  async function fetchCompanies() {
    if (loaded.value) return  // 已經抓過了，不重複抓
    loading.value = true
    try {
      companies.value = await fetch(STOCK_API).then(r => r.json())
      loaded.value = true
    } catch(e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { companies, loading, loaded, fetchCompanies }
})