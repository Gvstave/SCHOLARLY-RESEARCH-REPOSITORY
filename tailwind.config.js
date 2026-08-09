const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        // Alias Tailwind's `gray` palette to `gray` so existing `gray-` classes
        // render with the gray color set without editing all source files.
        gray: colors.gray,
      },
    },
  },
  plugins: [],
}
