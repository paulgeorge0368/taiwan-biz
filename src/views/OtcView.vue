<template>
    <div class="container">

        <div class="container-head">
            <div>
                <h1>上櫃公司查詢</h1>
                <p>公司名稱、統編或股票代號</p>
                <p><span>最後更新日期:2026-4-20</span><span>資料數(7,051,077)</span></p>
                <div class="search-bar">
                    <img 
                        src="../assets/sreach-icon.svg" 
                        alt="搜尋圖示"
                        width="16"
                        height="20"
                        decoding="async"
                        loading="lazy"
                    >
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="輸入關鍵字"
                        @keydown.enter="doSearch"
                    />
                    <button @click="doSearch">搜尋</button>
                </div>
            </div>
        </div>

        <div class="results-table">

                <div class="results-table-desk">
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

                <div class="results-table-mobile">
                    <div class="card-item" v-for="c in results" :key="c.id" @click="goToCompany(c.id)">
                        <p class="card-name">{{ c.name }}</p>
                        <p class="card-row">
                            <span>統一編號</span>
                            <span>{{ c.id }}</span>
                        </p>
                        <p class="card-row">
                            <span>資本額</span>
                            <span>{{ formatCapital(c.capital) }}</span>
                        </p>
                        <p class="card-row">
                            <span>地址</span>
                            <span>{{ c.address || '—' }}</span>
                        </p>
                        <p class="card-row">
                            <span>設立日期</span>
                            <span>{{ formatDate(c.established) }}</span>
                        </p>
                    </div>
                </div>
        </div>

        <div class="google-advertise">
            <p>google提供的推薦</p>
            <a href="https://www.newloan.com.tw/">
                <img 
                    src="/src/assets/yahoo-970x250-20260206_3-tiny.webp" 
                    alt="二胎房貸"
                    width="970"
                    height="250"
                    decoding="async"
                    loading="lazy"
                >
                <img 
                    src="/src/assets/arrow-right-icon.svg" 
                    alt="方向圖示"
                    width="35"
                    height="35"
                    decoding="async"
                    loading="lazy"
                >
            </a>
        </div>

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
  const otc = store.companies.filter(c => c.type === '上櫃')
  if (results.value.length > 0) return `找到 ${results.value.length} 筆結果`
  return `共載入 ${otc.length} 家上櫃公司`
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

  const otc = store.companies.filter(c => c.type === '上櫃')
  results.value = otc.filter(c =>
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
  const otc = store.companies.filter(c => c.type === '上櫃')
  results.value = [...otc].sort(() => Math.random() - 0.5).slice(0, 5)
})
</script>

<style scoped>
.search-bar {
  display: flex;
  position: relative;
  width: 100%;
}
.search-bar img{
    position: absolute;
    width: 16px;
    height: auto;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
}

.search-bar input {
  flex: 1;
  padding: 15px;
  padding-left: 55px;
  border-radius: 4px 0 0 4px;
  font-size: 18px;
  border: unset;
  outline: unset !important;
  font-weight: 500;
  width: 100%;
}

.search-bar button {
  padding: 20px;
  background: #348dfd;
  color: #fff;
  border: none !important;
  outline: unset !important;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  min-width: 18%;
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
  font-size: 15px;
  white-space: nowrap;
}

thead>tr>th:nth-child(4) {
  white-space: normal;
}

tbody>tr>td:nth-child(4) {
  white-space: normal;
}

th {
  background: #727171;
  font-weight: 500;
  color: white;
}

tr:hover td {
  background: #f9f9f9;
  cursor: pointer;
}

.container-head{
    aspect-ratio: 1931 / 603;
    width: 100%;
    background-image: url(../assets/banner-home-bg-t.webp);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    font-size: 15px;
    min-height: 70vh;
}
.container-head>div{
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
}
.container-head h1{
    font-size: 3.5em;
    font-weight: 700;
    color: #bdd6f2;
    margin-bottom: 30px;
}
.container-head>div>p{
    font-size: 1.1em;
    color: white;
    font-weight: 500;
    letter-spacing: 2px;
}
.container-head>div>p:nth-child(2){
    margin-bottom: 10px;
}
.container-head>div>p:nth-child(3){
    display: flex;
    gap: 30px;
     margin-bottom: 40px;
}

.results-table{
    width: 100%;
    max-width: 1000px;
    margin: var(--section-gap) auto;
    padding: 0 20px;
}

.google-advertise{
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: var(--section-gap);
    padding: 0 20px;
}
.google-advertise>a{
    width: 100%;
    display: block;
    position: relative;
    border: 1px solid black;
}
.google-advertise>a>img:nth-child(1){
    width: 100%;
    height: auto;
    display: block;
}
.google-advertise>a>img:nth-child(2){
    position: absolute;
    width: 35px;
    height: auto;
    bottom: 39%;
    right: 13%;
}
.google-advertise p{
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 2px;
    color: #707070;
    margin-bottom: 15px;
}
.results-table-mobile{
    display: none;
}
.card-item{
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: white;
}
.card-item>p{
    font-size: 15px;
    font-weight: 500;
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: flex-start;
    grid-gap: 10px;
}
.card-item>p:first-child{
    font-size: 20px;
    font-weight: 700;
    color: black;
    display: block;
    margin-bottom: 10px;
}
.card-item>p>span:first-child{
    background-color: #949494;
    color: white;
    padding: 1px 5px 3px 5px;
    border-radius: 2px;
    width: 80px;
    text-align: center;
}
.card-item>p>span:last-child{
    transform: translateY(4px);
}
.results-table-mobile>.card-item:last-child{
    margin-bottom: 0;
}

@media (max-width:767px) {
    body{
        background-color: #eff1f3;
    }
    .results-table-desk{
        display: none;
    }
    .results-table-mobile{
        display: block;
    }
    .container-head h1{
        font-size: clamp(20px, 9vw, 50px);
    }
    .container-head>div>p:nth-child(3) {
        flex-direction: column;
        gap: 5px;
    }
    .container-head>div>p:nth-child(2) {
        margin-bottom: 5px;
    }
    .search-bar button{
        width: max-content;
        min-width: unset;
    }
    .container-head>div>p{
        font-size: 15px;
    }
    .google-advertise>a>img:nth-child(2) {
        width: 5vw;
    }
    .container-head {
        padding-top: 100px;
        padding-bottom: 40px;
    }
}
</style>