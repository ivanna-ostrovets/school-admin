import xss from 'xss';

const tagsWhiteList = {
  a: ['target', 'href', 'title'],
  b: [],
  em: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  li: [],
  ol: [],
  p: [],
  span: [],
  strong: [],
  table: [],
  tbody: [],
  td: ['rowspan', 'colspan'],
  tfoot: [],
  th: ['rowspan', 'colspan'],
  thead: [],
  tr: ['rowspan'],
  u: [],
  ul: [],
};

export function sanitizeText(text: string) {
  const trimmedText = text
    .replace(/[\n]/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/\s{2,}/g, '')
    .trim();

  return xss(trimmedText, { whiteList: tagsWhiteList });
}
