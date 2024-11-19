/* eslint-disable @typescript-eslint/no-var-requires */
/* craco.config.js */
const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
      '@/store': path.resolve(__dirname, 'src/store/'),
      '@/hooks': path.resolve(__dirname, 'src/hooks/'),
      '@/data': path.resolve(__dirname, 'src/data/'),
      '@/styles': path.resolve(__dirname, 'src/styles/')
    }
  }
}
