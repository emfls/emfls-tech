import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { categorySlugs } from '../data/site';

const siteUrl = 'https://tech.emfls.com';
const staticPaths = ['/', '/search/', '/diagnose/', '/about/', '/privacy/', '/contact/', '/editorial-policy/'];
type SitemapEntry = { loc: string; lastmod?: string };

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', "'":'&apos;', '"':'&quot;' }[character] ?? character));

export const GET: APIRoute = async () => {
  const guides = await getCollection('guides');
  const entries: SitemapEntry[] = [
    ...staticPaths.map((path) => ({ loc: `${siteUrl}${path}` })),
    ...categorySlugs.map((slug) => ({ loc: `${siteUrl}/category/${slug}/` })),
    ...guides.map((guide) => ({ loc: `${siteUrl}/guides/${guide.id}/`, lastmod: guide.data.updatedDate.toISOString().slice(0, 10) }))
  ];
  const body = entries.map(({ loc, lastmod }) => `<url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
