module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'ghost-white': 'var(--color-ghost-white)',
        'raisin-black': 'var(--color-raisin-black)',
      }
    },
  },
  plugins: []
}