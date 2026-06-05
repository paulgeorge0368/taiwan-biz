<template>
    <div class="container">


        <div class="container-head">

            <div class="container-head-bg">
                <img 
                    src="../assets/banner-home-bg-t.webp"
                    alt="背景圖片"
                    fetchpriority="high"
                    width="1920"
                    height="604"
                    decoding="async" 
                    loading="lazy"
                >
            </div>

            <div class="container-head-body">
            
                <div v-if="loading">載入中...</div>

                <div v-else-if="company">
                    <div class="company-header">
                        <div class="company-header-title">
                            <div class="company-header-title-icon">
                                <img 
                                    src="../assets/company-icon.svg" 
                                    alt="公司圖示"
                                    width="51"
                                    height="60"
                                    decoding="async" 
                                    loading="lazy"
                                >
                            </div>
                            <div class="company-header-title-text">
                                <div class="company-name">{{ company.name }}</div>
                                <div class="company-code">產業類別：{{ INDUSTRY_MAP[company.industry] || company.industry }}</div>
                            </div>
                        </div>
                        <div class="status-tag">核准設立</div>
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
                                <span class="info-label">股票代號：</span>
                                <span class="info-value">{{ company.code }}</span>
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

        </div>

        <div class="section-gap"></div>

        <div class="gov-section">
            <h2>最新熱門搜尋公司</h2>
            <div class="gov-info-section">
                <div class="gov-info-header">
                    <a href="https://www.kuofong.com.tw/">公司名稱：<span>國峯租賃股份有限公司</span></a>
                    <span class="gov-status-tag">核准設立</span>
                </div>

                <p class="gov-description">
                    國峯租賃，同行間資本最高，讓你貸到最滿，額度600萬，2年寬限期，條件寬鬆，自營商、攤販、計程車司機，沒薪轉也能辦理。
                </p>

                <hr>

                <table class="gov-table">
                    <tr>
                    <th>統一編號</th>
                    <td>52611690</td>
                    </tr>
                    <tr>
                    <th>登記現況</th>
                    <td>核准設立「查詢最新營業狀況請至 財政部稅務入口網」</td>
                    </tr>
                    <tr>
                    <th>公司名稱</th>
                    <td>國峯租賃股份有限公司<a href="https://www.google.com/search?q=%E5%9C%8B%E5%B3%AF%E7%A7%9F%E8%B3%83%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8" target="_blank">Google搜尋</a>「國際貿易署廠商英文名稱查詢(限經營出進口或買賣業務者)」</td>
                    </tr>
                    <tr>
                    <th>章程所訂外文公司名稱</th>
                    <td>109年02月20日 發文號10945784310變更名稱<br>（前名稱：國峯股份有限公司）</td>
                    </tr>
                    <tr>
                    <th>資本總額(元)</th>
                    <td>500,000,000</td>
                    </tr>
                    <tr>
                    <th>實收資本額(元)</th>
                    <td>279,900,000</td>
                    </tr>
                    <tr>
                    <th>每股金額(元)</th>
                    <td>10</td>
                    </tr>
                    <tr>
                    <th>已發行訂股份總數(股)</th>
                    <td>27,900,000</td>
                    </tr>
                    <tr>
                    <th>代表人姓名</th>
                    <td>劉芳良</td>
                    </tr>
                    <tr>
                    <th>公司所在地</th>
                    <td>臺北市中正區衡陽路51號5樓之3<a href="https://www.google.com/maps/place/%E5%9C%8B%E5%B3%AF%E7%A7%9F%E8%B3%83%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/@25.0425615,121.5095345,17z/data=!3m2!4b1!5s0x3442a90b12dedc0f:0xce2a5e28c4a9c3a1!4m6!3m5!1s0x3442a93323f67847:0x1f1582bbab3e46d4!8m2!3d25.0425567!4d121.5121094!16s%2Fg%2F11g22z65fg?authuser=0&entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank">電子地圖</a></td>
                    </tr>
                    <tr>
                    <th>同地址登記現況為核准設立之公司家數</th>
                    <td>2</td>
                    </tr>
                    <tr>
                    <th>登記機關</th>
                    <td>臺北市政府</td>
                    </tr>
                    <tr>
                    <th>核准設立日期</th>
                    <td>106年03月21日</td>
                    </tr>
                    <tr>
                    <th>最後核准變更日期</th>
                    <td>115年05月06日</td>
                    </tr>
                </table>
            </div>
            <div class="section-gap-mini"></div> 
            <div class="gov-info-section">
                <div class="gov-info-header">
                    <a href="https://www.newloan.com.tw/">公司名稱：<span>厝好貸有限公司</span></a>
                    <span class="gov-status-tag">核准設立</span>
                </div>

                <p class="gov-description">
                    國峯厝好貸全台服務，二胎房貸品牌，上市櫃融資撥款，藝人代言更有保障，ISO國際雙認證，服務與資安都獲得肯定，是銀行之後，最佳的貸款選擇。
                </p>

                <hr>

                <table class="gov-table">
                    <tr>
                    <th>統一編號</th>
                    <td>60741876</td>
                    </tr>
                    <tr>
                    <th>登記現況</th>
                    <td>核准設立  「查詢最新營業狀況請至 財政部稅務入口網 」</td>
                    </tr>
                    <tr>
                    <th>公司名稱</th>
                    <td>厝好貸有限公司<a href="https://www.google.com/search?q=%E5%8E%9D%E5%A5%BD%E8%B2%B8%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8" target="_blank">Google搜尋</a>「國際貿易署廠商英文名稱查詢(限經營出進口或買賣業務者)」</td>
                    </tr>
                    <tr>
                    <th>章程所訂外文公司名稱</th>
                    <td>109年02月20日 發文號10945784310變更名稱<br>（前名稱：國峯股份有限公司）</td>
                    </tr>
                    <tr>
                    <th>資本總額(元)</th>
                    <td>5,000,000</td>
                    </tr>
                    <tr>
                    <th>代表人姓名</th>
                    <td>郭耕宇</td>
                    </tr>
                    <tr>
                    <th>公司所在地</th>
                    <td>臺北市中正區衡陽路51號13樓之4<a href="https://www.google.com/maps/place/%E5%9C%8B%E5%B3%AF%E5%8E%9D%E5%A5%BD%E8%B2%B8%EF%BD%9C%E9%A0%AD%E5%AE%B6%E8%B2%B8%EF%BC%8D%E6%88%BF%E5%B1%8B%E4%BA%8C%E8%83%8E%E8%B2%B8%E6%AC%BE%E7%AC%AC%E4%B8%80%E5%93%81%E7%89%8C/@25.0425615,121.5095345,17z/data=!3m1!5s0x3442a90b12dedc0f:0xce2a5e28c4a9c3a1!4m10!1m2!2m1!1z5Y6d5aW96LK45pyJ6ZmQ5YWs5Y-4!3m6!1s0x3442a924d1b5cbc5:0x3808ff961c8f4b46!8m2!3d25.0425567!4d121.5121094!15sChXljp3lpb3osrjmnInpmZDlhazlj7haGyIZ5Y6dIOWlvSDosrgg5pyJ6ZmQIOWFrOWPuJIBFGZpbmFuY2lhbF9jb25zdWx0YW50mgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ4V2RVMVZTbTFUYW1SSlUwZEZkMDFHVG1waFJqbEVXa2RLYldOVlJSQULgAQD6AQUIkAEQHA!16s%2Fg%2F11ng66vv_p?authuser=0&entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank">電子地圖</a></td>
                    </tr>
                    <tr>
                    <th>同地址登記現況為核准設立之公司家數</th>
                    <td>3</td>
                    </tr>
                    <tr>
                    <th>登記機關</th>
                    <td>臺北市政府</td>
                    </tr>
                    <tr>
                    <th>核准設立日期</th>
                    <td>114年03月18日</td>
                    </tr>
                    <tr>
                    <th>最後核准變更日期</th>
                    <td>114年11月17日</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="section-gap"></div>

        <div class="category-cards">
            <div>
                <RouterLink to="/listed" class="category-card">
                    <img 
                        src="../assets/otc-icon.svg" 
                        alt="上市公司"
                        width="524"
                        height="142"
                        decoding="async" 
                        loading="lazy"
                    >
                    <span>上市公司</span>
                </RouterLink>
                <RouterLink to="/otc" class="category-card">
                    <img 
                        src="../assets/otc-icon.svg" 
                        alt="上市公司"
                        width="524"
                        height="142"
                        decoding="async" 
                        loading="lazy"
                    >
                    <span>上櫃公司</span>
                </RouterLink>
            </div>
        </div>

        <div class="section-gap"></div>

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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '../stores/useCompanyStore'

const route = useRoute()
const router = useRouter()
const store = useCompanyStore()

const loading = ref(true)
const company = ref(null)
const related = ref([])

const INDUSTRY_MAP = {
  '01': '水泥工業', '02': '食品工業', '03': '塑膠工業',
  '04': '紡織纖維', '05': '電機機械', '06': '電器電纜',
  '08': '玻璃陶瓷', '09': '造紙工業', '10': '鋼鐵工業',
  '11': '橡膠工業', '12': '汽車工業', '14': '建材營造',
  '15': '航運業', '16': '觀光餐旅', '17': '金融保險',
  '18': '貿易百貨', '19': '綜合', '20': '其他',
  '21': '化學工業', '22': '生技醫療業', '23': '油電燃氣業',
  '24': '半導體業', '25': '電腦及週邊設備業', '26': '光電業',
  '27': '通信網路業', '28': '電子零組件業', '29': '電子通路業',
  '30': '資訊服務業', '31': '其他電子業', '32': '文化創意業',
  '33': '農業科技業', '34': '電子商務', '35': '綠能環保',
  '36': '數位雲端', '37': '運動休閒', '38': '居家生活',
  '80': '管理股票', '91': '存託憑證'
}

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

async function loadCompany(id) {
  loading.value = true
  await store.fetchCompanies()
  company.value = store.companies.find(c => c.id === id) || null

  if (company.value) {
    related.value = store.companies
      .filter(c => c.industry === company.value.industry && c.id !== id)
      .slice(0, 8)
  }
  loading.value = false
}

onMounted(() => loadCompany(route.params.id))

watch(() => route.params.id, (newId) => {
  if (newId) loadCompany(newId)
})
</script>

<style scoped>
.section-gap{
    width: 100%;
    display: block;
    height: 80px;
}
.section-gap-mini{
    width: 100%;
    display: block;
    height: 40px;
}
.container-head{
    width: 100%;
    /* background-image: url(../assets/banner-home-bg-t.webp);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat; */
    font-size: 15px;
    position: relative;
}
.container-head-bg{
    position: absolute;
    width: 100%;
    height: 85%;
    top: 0;
    left: 0;
    z-index: -1;
}
.container-head-bg img{
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
}
.container-head-body{
    padding: 0 20px;
    padding-top: 100px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
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
    display: grid;
    grid-template-columns: 1fr 90px;
    align-items: stretch;
    justify-content: space-between;
}

.company-header-title{
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: center;
    gap: 15px;
}
.company-header-title-icon{
    width: 60px;
    aspect-ratio: 1 / 1;
    background-color: #348dfd;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
}
.company-header-title-icon img{
    width: 30px;
    height: auto;
    display: flex;
}

.company-name { font-size: 25px; font-weight: 700; }
.company-code { font-size: 15px; color: #888; }

.status-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid #ccc;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout {
  display: grid;
  grid-template-columns: 56% 1fr;
  gap: 1rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
}

.card h3 {
  font-size: 17px;
  color: #348dfd;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.info-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
}

.info-row:last-child { border-bottom: none; }
.info-label { color: #888; width: 80px; flex-shrink: 0; }
.info-value { color: #333; word-break: break-all; }
.info-value a { color: #348dfd; text-decoration: none; }

.related-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.related-item:last-child { border-bottom: none; }
.related-item:hover .related-name { color: #348dfd; }
.related-name { font-size: 15px; font-weight: 500; }
.related-addr { color: #aaa; font-size: 14px; margin-top: 2px; }

@media (max-width: 767px) {
  .layout { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
    .section-gap{
        height: 50px;
    }
    .layout { grid-template-columns: 1fr; }
    .company-header-title-icon img{
        width: 17px;
    }
    .company-header-title-icon{
        width: 36px;
    }
    .company-header-title[data-v-251e7fda] {
        grid-template-columns: auto 1fr;
    }
    .company-header{
        grid-template-columns: 1fr;
        gap: 10px;
    }
    .company-name{
        font-size: 20px;
    }
}





.gov-section{
    padding: 0 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
}
.gov-section h2{
    font-size: 25px;
    font-weight: 700;
    color: #348dfd;
    margin-bottom: 15px;
}
.gov-info-section {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
}

.gov-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.gov-info-header a {
  font-size: 25px;
  font-weight: 700;
  display: block;
  color: black;
  text-decoration: unset !important;
}

.gov-info-header a span {
  color: #348dfd;
}

.gov-status-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid #ccc;
}

.gov-description {
    font-size: 15px;
    color: #555;
    line-height: 1.8;
    font-weight: 500;
    width: 100%;
    max-width: 660px;
}

.gov-section hr{
    border: unset;
    border-top: 1px solid #d5d5d5;
    margin-top: 25px;
    display: block;
    margin-bottom: 20px;
}

.gov-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.gov-table tr {
  border-bottom: 1px solid #f0f0f0;
}

.gov-table tr:last-child {
  border-bottom: none;
}

.gov-table th {
  text-align: left;
  padding: 10px 16px;
  color: #333;
  font-weight: 500;
  width: 290px;
}

.gov-table td {
  padding: 10px 16px;
  color: #333;
  font-weight: 500;
  line-height: 1.7em;
}

.gov-table td a{
    border: 1px solid #348dfd;
    color: #348dfd;
    text-decoration: unset !important;
    padding: 1px 5px 2px;
    margin: 0 5px;
}

.gov-table>tbody>tr:nth-child(even){
    background-color: #efefef;
}

@media (max-width:767px) {
    .gov-info-section{
        padding: 20px;
    }
    .gov-table th {
        width: 35%;
    }
}
@media (max-width: 640px) {
    .gov-section h2{
        font-size: 20px;
    }
    .gov-info-header {
        margin-bottom: 15px;
    }
    .gov-info-header a{
        font-size: 19px;
    }
    .gov-description{
        line-height: 1.5em;
    }

    .gov-table tr {
        display: flex;
        flex-direction: column;
        padding: 0px 0;
    }

    .gov-table>tbody>tr:nth-child(even){
        background-color: transparent;
    }
    .gov-table th{
        background-color:  #efefef;
        width: 100%;
        padding: 5px 15px;
    }
    .gov-table td{
        padding: 0;
        padding-top: 5px;
        padding-bottom: 10px;
    }
    .gov-info-header[data-v-251e7fda] {
        flex-direction: column-reverse;
        gap: 10px;
    }
    .gov-section hr[data-v-251e7fda] {
        margin-top: 16px;
    }
}



.category-cards {
    padding: 0 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
}

.category-cards >div{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}


.category-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  gap: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 18px;
  border: 1px solid #eee;
  transition: box-shadow 0.2s;
  font-weight: 500;
}

.category-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.category-card span{
    width: 100%;
    text-align: center;
}

.category-card img {
  width: 160px;
  height: auto;
}

@media (max-width:767px) {
    .category-cards >div{
        gap: 25px;
    }
    .category-card{
        padding: 25px;
    }
    .category-card img {
        width: 18vw;
    }
}
@media (max-width:767px) {
    .category-cards >div{
        gap: 20px;
    }
    .category-card{
        font-size: 15px;
        gap: 10px;
        padding: 12px;
    }
}

@media (max-width:480px) {
    .category-card{
        font-size: 14px;
    }
    .category-card img {
        width: 12vw;
    }
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
@media (max-width:767px) {
    .google-advertise>a>img:nth-child(2) {
        width: 5vw;
    }
}
</style>