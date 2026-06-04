<template>
  <div class="container">
    <h1>台灣上市上櫃公司查詢</h1>

    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="輸入公司名稱、統編或股票代號"
        @keydown.enter="doSearch"
      />
      <button @click="doSearch">搜尋</button>
    </div>

    <div class="status">{{ status }}</div>

    <table v-if="results.length > 0">
      <thead>
        <tr>
          <th>公司名稱</th>
          <th>統一編號</th>
          <th>資本額</th>
          <th>地址</th>
          <th>設立日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in results" :key="c.id" @click="goToCompany(c.id)">
          <td>{{ c.name }}</td>
          <td>{{ c.id }}</td>
          <td>{{ formatCapital(c.capital) }}</td>
          <td>{{ c.address || '—' }}</td>
          <td>{{ formatDate(c.established) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCompanyStore } from '../stores/useCompanyStore'

const router = useRouter()
const store = useCompanyStore()

const searchQuery = ref('')
const results = ref([])

const status = computed(() => {
  if (store.loading) return '資料載入中...'
  if (results.value.length > 0) return `找到 ${results.value.length} 筆結果`
  return `共載入 ${store.companies.length} 家上市上櫃公司`
})

function formatDate(d) {
  if (!d || d.length !== 8) return '—'
  return `${d.substring(0,4)}/${d.substring(4,6)}/${d.substring(6,8)}`
}

function formatCapital(c) {
  if (!c) return '—'
  return Number(c).toLocaleString() + ' 元'
}

function doSearch() {
  const q = searchQuery.value.trim()
  if (!q) return

  results.value = store.companies.filter(c =>
    c.name.includes(q) ||
    c.id === q ||
    c.code === q ||
    (c.short_name && c.short_name.includes(q))
  )
}

function goToCompany(id) {
  router.push(`/company/${id}`)
}

onMounted(async () => {
  await store.fetchCompanies()
  results.value = [...store.companies].sort(() => Math.random() - 0.5).slice(0, 5)
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-bar button {
  padding: 8px 20px;
  background: #e8a020;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status {
  font-size: 13px;
  color: #888;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 10px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

th {
  background: #f5f5f5;
  font-weight: 500;
}

tr:hover td {
  background: #f9f9f9;
  cursor: pointer;
}
</style>