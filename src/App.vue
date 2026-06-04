<template>
  <nav>
    <RouterLink to="/">首頁</RouterLink>
    <RouterLink to="/listed">上市公司</RouterLink>
    <RouterLink to="/otc">上櫃公司</RouterLink>
  </nav>

  <RouterView />

  <footer>
    © 2026 台灣公司查詢
  </footer>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f5f5; color: #333; }

nav {
  background: #fff;
  padding: 1rem 2rem;
  display: flex;
  gap: 1.5rem;
  border-bottom: 1px solid #eee;
}

nav a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
}

nav a.router-link-active {
  color: #e8a020;
  font-weight: 500;
}

footer {
  text-align: center;
  padding: 2rem;
  font-size: 13px;
  color: #aaa;
  border-top: 1px solid #eee;
  margin-top: 2rem;
}
</style>