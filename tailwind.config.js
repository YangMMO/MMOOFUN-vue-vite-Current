

module.exports = {
  content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'white': '#fff',
      'black': '#111827',
      'gray': '#6B7280',
    }
  },
  plugins:[],
  varints: {
    extend:{
      backgroundColor: ['dark']
    }
  }
}
