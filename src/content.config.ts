import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categorySlugs } from './data/site';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.enum(categorySlugs), device: z.string(),
    problemType: z.string(), difficulty: z.enum(['easy','moderate','advanced']).default('easy'),
    updatedDate: z.coerce.date(), summary: z.string(), symptoms: z.array(z.string()), causes: z.array(z.string()),
    checks: z.array(z.string()), solutions: z.array(z.object({ title:z.string(), body:z.string() })),
    warnings: z.array(z.string()).default([]), relatedGuides: z.array(z.string()).default([])
  })
});
export const collections = { guides };
