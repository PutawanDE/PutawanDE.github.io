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
        'cool-gray': 'var(--color-cool-gray)',
      },
      fontFamily: {
        // body and headings
        atkinson: ["'Atkinson Hyperlegible'", "sans-serif"],
        // monospace for code blocks
        atkinsonMono: ["'Atkinson Hyperlegible Mono'", "monospace"],
      },
    },
  },
  plugins: []
}