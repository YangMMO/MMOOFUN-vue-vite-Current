module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // colors: {
    //   'white': '#fff',
    //   'black': '#111827',
    //   'gray': '#6B7280',
    // },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      box_l: '4px 4px rgba(254,226,226, 0.85)',
      box_l_h: '8px 8px rgba(252,165,165, 0.85)',
      box_d: '4px 4px rgba(0,0,0, 0.85)',
      box_d_h: '8px 8px rgba(0,0,0, 0.95)'
    },
    dropShadow: {
      box_l: '4px 4px rgba(254,226,226, 0.85)',
      box_l_h: '8px 8px rgba(252,165,165, 0.85)',
      box_d: '4px 4px rgba(0,0,0, 0.85)',
      box_d_h: '8px 8px rgba(0,0,0, 0.95)'
    },
    // backgroundImage: {
      // 'load_gradient_l': "url('./src/assets/img/error.png')",
      // 'load_gradient_d': "url('./src/assets/img/error.png')",
    // }
  },
  plugins:[],
  varints: {
    extend:{
      backgroundColor: ['dark'],
      // boxShadow: ['hover'],
    }
  }
}
