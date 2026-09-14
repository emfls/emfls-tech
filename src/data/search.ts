import type { CollectionEntry } from 'astro:content';

export const searchAliases: Record<string, string> = {
  '와이파이': 'wifi', '무선인터넷': 'wifi', 'wi-fi': 'wifi',
  '블루투스': 'bluetooth', '저장 공간': '저장공간', '컴퓨터': 'pc', '느림': '느리', '외장 하드': '외장하드', '소리 안남': '소리',
};

export function normalizeSearchText(value: string) {
  let normalized = value.toLowerCase().trim().replace(/[\u2010-\u2015_./]+/g, ' ').replace(/\s+/g, ' ');
  Object.entries(searchAliases).forEach(([from, to]) => { normalized = normalized.replaceAll(from, to); });
  return normalized.replace(/\s+/g, '');
}

export function toSearchIndex(guides: CollectionEntry<'guides'>[]) {
  return guides.map((guide) => ({ slug: guide.id, title: guide.data.title, description: guide.data.description, category: guide.data.category, device: guide.data.device, problemType: guide.data.problemType, summary: guide.data.summary, symptoms: guide.data.symptoms, causes: guide.data.causes })).sort((a, b) => a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug));
}
