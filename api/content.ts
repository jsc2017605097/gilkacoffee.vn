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

// Tạo commit mới cập nhật 3 file content bằng Git API cấp thấp để tránh lỗi SHA 409
async function commitAllContentFiles(payload: {
  site: any;
  navigation: any;
  products: any;
}) {
  // 1) Lấy ref hiện tại của branch
  const refRes = await githubRequest(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
  const refJson = (await refRes.json()) as any;
  const currentCommitSha = refJson.object.sha;

  // 2) Lấy commit hiện tại để biết tree gốc
  const commitRes = await githubRequest(`/repos/${OWNER}/${REPO}/git/commits/${currentCommitSha}`);
  const commitJson = (await commitRes.json()) as any;
  const baseTreeSha = commitJson.tree.sha;

  // 3) Tạo blob cho từng file JSON
  const [siteBlobRes, navBlobRes, productsBlobRes] = await Promise.all([
    githubRequest(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: JSON.stringify(payload.site, null, 2),
        encoding: 'utf-8',
      }),
    }),
    githubRequest(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: JSON.stringify(payload.navigation, null, 2),
        encoding: 'utf-8',
      }),
    }),
    githubRequest(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: JSON.stringify(payload.products, null, 2),
        encoding: 'utf-8',
      }),
    }),
  ]);

  const siteBlob = (await siteBlobRes.json()) as any;
  const navBlob = (await navBlobRes.json()) as any;
  const productsBlob = (await productsBlobRes.json()) as any;

  // 4) Tạo tree mới trên baseTreeSha với 3 file content
  const treeRes = await githubRequest(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: [
        {
          path: FILES.site,
          mode: '100644',
          type: 'blob',
          sha: siteBlob.sha,
        },
        {
          path: FILES.navigation,
          mode: '100644',
          type: 'blob',
          sha: navBlob.sha,
        },
        {
          path: FILES.products,
          mode: '100644',
          type: 'blob',
          sha: productsBlob.sha,
        },
      ],
    }),
  });

  const treeJson = (await treeRes.json()) as any;

  // 5) Tạo commit mới
  const commitMessage = 'chore(content): update site, navigation, products from admin';
  const newCommitRes = await githubRequest(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message: commitMessage,
      tree: treeJson.sha,
      parents: [currentCommitSha],
    }),
  });

  const newCommitJson = (await newCommitRes.json()) as any;

  // 6) Cập nhật ref head của branch trỏ về commit mới (fast-forward)
  await githubRequest(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({
      sha: newCommitJson.sha,
      force: false,
    }),
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

      await commitAllContentFiles({
        site: body.site,
        navigation: body.navigation,
        products: body.products,
      });

      return res.status(200).json({ ok: true });
    } catch (error: any) {
      console.error('PUT /api/content error', error);
      return res.status(500).send(error.message || 'Internal Server Error');
    }
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).send('Method Not Allowed');
}


