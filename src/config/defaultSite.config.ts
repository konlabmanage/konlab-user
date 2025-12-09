export default {
  name: 'Newspaper A',
  pages: [
    { path: '/news', type: 'list', title: 'Tin tức' },
    { path: '/news/[slug]', type: 'detail' },
  ],
};
