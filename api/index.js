export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    // 搜尋公司名稱
    if (path === '/search') {
      const q = url.searchParams.get('q') || '';
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = 25;
      const offset = (page - 1) * limit;

      const isId = /^\d{8}$/.test(q.trim());

      let results;
      if (isId) {
        results = await env.DB.prepare(
          'SELECT * FROM companies WHERE id = ? LIMIT 1'
        ).bind(q.trim()).all();
      } else {
        results = await env.DB.prepare(
          'SELECT * FROM companies WHERE name LIKE ? OR address LIKE ? LIMIT ? OFFSET ?'
        ).bind(`%${q}%`, `%${q}%`, limit, offset).all();
      }

      return new Response(JSON.stringify(results.results), { headers });
    }

    // 取得單一公司
    if (path.startsWith('/company/')) {
      const id = path.replace('/company/', '');
      const result = await env.DB.prepare(
        'SELECT * FROM companies WHERE id = ?'
      ).bind(id).first();

      return new Response(JSON.stringify(result), { headers });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers
    });
  }
};