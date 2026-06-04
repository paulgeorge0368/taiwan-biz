<template>
  <div class="container">
    <a class="back-link" @click="router.back()">← 返回</a>

    <div v-if="loading">載入中...</div>

    <div v-else-if="company">
      <div class="company-header">
        <div>
          <div class="company-name">{{ company.name }}</div>
          <div class="company-code">股票代號：{{ company.code }}</div>
        </div>
        <div class="status-tag">{{ company.type }}</div>
      </div>

      <div class="layout">
        <div class="card">
          <h3>公司基本資料</h3>
          <div class="info-row" v-if="company.chairman">
            <span class="info-label">董事長</span>
            <span class="info-value">{{ company.chairman }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">統一編號</span>
            <span class="info-value">{{ company.id }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">資本額</span>
            <span class="info-value">{{ formatCapital(company.capital) }}</span>
          </div>
          <div class="info-row" v-if="company.address">
            <span class="info-label">地址</span>
            <span class="info-value">{{ company.address }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">設立日期</span>
            <span class="info-value">{{ formatDate(company.established) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">{{ company.type === '上市' ? '上市日期' : '上櫃日期' }}</span>
            <span class="info-value">{{ formatDate(company.listed_date) }}</span>
          </div>
          <div class="info-row" v-if="company.phone">
            <span class="info-label">電話</span>
            <span class="info-value">{{ company.phone }}</span>
          </div>
          <div class="info-row" v-if="company.fax">
            <span class="info-label">傳真</span>
            <span class="info-value">{{ company.fax }}</span>
          </div>
          <div class="info-row" v-if="company.email">
            <span class="info-label">Email</span>
            <span class="info-value">
              <a :href="`mailto:${company.email}`">{{ company.email }}</a>
            </span>
          </div>
          <div class="info-row" v-if="company.website">
            <span class="info-label">網址</span>
            <span class="info-value">
              <a :href="company.website.trim()" target="_blank">{{ company.website.trim() }}</a>
            </span>
          </div>
        </div>

        <div class="card">
          <h3>其他相關行業公司</h3>
          <div v-if="related.length > 0">
            <div class="related-item" v-for="c in related" :key="c.id" @click="goToCompany(c.id)">
              <div class="related-name">{{ c.name }}</div>
              <div class="related-addr">{{ c.address || '—' }}</div>
            </div>
          </div>
          <div v-else>無相關行業公司</div>
        </div>
      </div>
    </div>

    <div v-else>找不到此公司資料</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '../stores/useCompanyStore'

const route = useRoute()
const router = useRouter()
const store = useCompanyStore()

const loading = ref(true)
const company = ref(null)
const related = ref([])

function formatDate(d) {
  if (!d || d.length !== 8) return '—'
  return `${d.substring(0,4)}/${d.substring(4,6)}/${d.substring(6,8)}`
}

function formatCapital(c) {
  if (!c) return '—'
  return Number(c).toLocaleString() + ' 元'
}

function goToCompany(id) {
  router.push(`/company/${id}`)
}

onMounted(async () => {
  await store.fetchCompanies()
  const id = route.params.id
  company.value = store.companies.find(c => c.id === id) || null

  if (company.value) {
    related.value = store.companies
      .filter(c => c.industry === company.value.industry && c.id !== id)
      .slice(0, 8)
  }

  loading.value = false
})
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #555;
  font-size: 14px;
  cursor: pointer;
}

.back-link:hover { color: #000; }

.company-header {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.company-name { font-size: 1.5rem; font-weight: 700; }
.company-code { font-size: 14px; color: #888; margin-top: 4px; }

.status-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid #ccc;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
}

.card h3 {
  font-size: 15px;
  color: #e8a020;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.info-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.info-row:last-child { border-bottom: none; }
.info-label { color: #888; width: 80px; flex-shrink: 0; }
.info-value { color: #333; word-break: break-all; }
.info-value a { color: #4a90d9; text-decoration: none; }

.related-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.related-item:last-child { border-bottom: none; }
.related-item:hover .related-name { color: #e8a020; }
.related-name { font-size: 13px; font-weight: 500; }
.related-addr { color: #aaa; font-size: 12px; margin-top: 2px; }

@media (max-width: 640px) {
  .layout { grid-template-columns: 1fr; }
}
</style>