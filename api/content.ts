import type { VercelRequest, VercelResponse } from '@vercel/node';

const OWNER = 'jsc2017605097';
const REPO = 'gilkacoffee.vn';
const BRANCH = 'main';

const FILES = {
  site: 'content/site.json',
  navigation: 'content/navigation.json',
  products: 'content/products.json',
};

async function githubRequest(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN chưa được cấu hình trên Vercel.');
  }

  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'gilkacoffee-admin',
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${text}`);
  }

  return res;
}

async function getFileContent(path: string) {
  const res = await githubRequest(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  const json = (await res.json()) as any;
  const decoded = Buffer.from(json.content, 'base64').toString('utf-8');
  return { content: decoded, sha: json.sha };
}

async function putFileContent(path: string, content: string, sha: string, message: string) {
  const body = {
    message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    sha,
    branch: BRANCH,
  };

  await githubRequest(`/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const [site, navigation, products] = await Promise.all([
        getFileContent(FILES.site),
        getFileContent(FILES.navigation),
        getFileContent(FILES.products),
      ]);

      return res.status(200).json({
        site: JSON.parse(site.content),
        navigation: JSON.parse(navigation.content),
        products: JSON.parse(products.content),
      });
    } catch (error: any) {
      console.error('GET /api/content error', error);
      return res.status(500).send(error.message || 'Internal Server Error');
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = req.body;
      if (!body || typeof body !== 'object') {
        return res.status(400).send('Body không hợp lệ');
      }

      const [siteFile, navFile, productsFile] = await Promise.all([
        getFileContent(FILES.site),
        getFileContent(FILES.navigation),
        getFileContent(FILES.products),
      ]);

      await Promise.all([
        putFileContent(
          FILES.site,
          JSON.stringify(body.site, null, 2),
          siteFile.sha,
          'chore(content): update site.json from admin',
        ),
        putFileContent(
          FILES.navigation,
          JSON.stringify(body.navigation, null, 2),
          navFile.sha,
          'chore(content): update navigation.json from admin',
        ),
        putFileContent(
          FILES.products,
          JSON.stringify(body.products, null, 2),
          productsFile.sha,
          'chore(content): update products.json from admin',
        ),
      ]);

      return res.status(200).json({ ok: true });
    } catch (error: any) {
      console.error('PUT /api/content error', error);
      return res.status(500).send(error.message || 'Internal Server Error');
    }
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).send('Method Not Allowed');
}


