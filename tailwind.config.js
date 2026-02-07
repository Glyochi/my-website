module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          body: '#a5f3fc',
          heading: '#67e8f9',
          emphasis: '#22d3ee',
        },
        surface: {
          base: '#1f2937',
          raised: '#374151',
          panel: '#4b5563',
          tech: '#1d4ed8',
        },
        callout: {
          link: '#fdba74',
          note: {
            bg: '#fdba74',
            button: '#e11d48',
          },
          code: {
            bg: '#0284c7',
            text: '#e0f2fe',
          },
        },
      },
    },
  },
  plugins: [],
}
