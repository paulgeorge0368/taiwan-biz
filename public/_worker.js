const BOT_AGENTS = [
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot',
  'slurp', 'baiduspider', 'facebookexternalhit',
  'twitterbot', 'linkedinbot', 'whatsapp'
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some(bot => ua.includes(bot));
}

async function getCompanyData(id) {
  try {
    const res = await fetch(`https://taiwan-stock-api.kuofong-engineer.workers.dev`);
    const data = await res.json();
    return data.find(c => c.id === id) || null;
  } catch(e) {
    return null;
  }
}

function formatDate(d) {
  if (!d || d.length !== 8) return '—';
  return `${d.substring(0,4)}/${d.substring(4,6)}/${d.substring(6,8)}`;
}

function formatCapital(c) {
  if (!c) return '—';
  return Number(c).toLocaleString() + ' 元';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';

    // 只有爬蟲訪問 /company/:id 才做預渲染
    if (isBot(userAgent) && url.pathname.startsWith('/company/')) {
      const id = url.pathname.replace('/company/', '');
      const company = await getCompanyData(id);

      if (company) {
        const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>${company.name} - 公司查詢網</title>
  <meta name="description" content="${company.name}，統一編號：${company.id}，地址：${company.address || '—'}，資本額：${formatCapital(company.capital)}">
  <link rel="canonical" href="https://taiwan-biz.pages.dev/company/${company.id}">
  <meta property="og:title" content="${company.name} - 公司查詢網">
  <meta property="og:description" content="${company.name}，統一編號：${company.id}，地址：${company.address || '—'}">
  <meta property="og:url" content="https://taiwan-biz.pages.dev/company/${company.id}">
</head>
<body>
  <h1>${company.name}</h1>
  <p>統一編號：${company.id}</p>
  <p>股票代號：${company.code}</p>
  <p>類型：${company.type}</p>
  <p>董事長：${company.chairman || '—'}</p>
  <p>資本額：${formatCapital(company.capital)}</p>
  <p>地址：${company.address || '—'}</p>
  <p>設立日期：${formatDate(company.established)}</p>
  <p>電話：${company.phone || '—'}</p>
  <p>網址：${company.website || '—'}</p>
</body>
</html>`;

        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
    }

    // 其他請求正常處理
    return env.ASSETS.fetch(request);
  }
};