export default {
  target: 'static',

  head: {
    title: 'Chris Phua - Software Developer & Entrepreneur',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Portfolio of Chris Phua - Senior Engineer specializing in Vue.js, Laravel, Spring Boot, Flutter, and cloud technologies.'
      },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'manifest', href: '/manifest.json' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
  ],

  axios: {},

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  content: {},

  build: {
  }
}
