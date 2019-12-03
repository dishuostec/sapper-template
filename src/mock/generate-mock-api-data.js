import { build_dir } from '@sapper/internal/manifest-server.mjs';
import fs from 'fs';
import posts from './posts.js';

export function generate_mock_api_data() {
  const mock_api = `${build_dir}/mock_api`;
  if (!fs.existsSync(mock_api)) {
    fs.mkdirSync(mock_api);
  }
  if (!fs.existsSync(`${mock_api}/blog`)) {
    fs.mkdirSync(`${mock_api}/blog`);
  }

  const contents = JSON.stringify(posts.map(post => {
    const post_data = JSON.stringify(post);
    const { slug } = post;
    fs.writeFileSync(`${mock_api}/blog/${slug}.json`, post_data);

    return {
      title: post.title,
      slug: post.slug,
    };
  }));

  fs.writeFileSync(`${mock_api}/blog.json`, contents);
}
