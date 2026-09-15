import { defineConfig } from 'astro/config';
import { rm, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';

const finalizeSingleSitemap = () => ({
  name: 'finalize-single-sitemap',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outputDir = fileURLToPath(dir);
      await rename(`${outputDir}/sitemap-0.xml`, `${outputDir}/sitemap.xml`);
      await rm(`${outputDir}/sitemap-index.xml`, { force: true });
    }
  }
});

export default defineConfig({ site: 'https://tech.emfls.com', output: 'static', integrations: [sitemap(), finalizeSingleSitemap()] });
