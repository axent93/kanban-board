/* eslint-disable @typescript-eslint/no-var-requires */
/* craco.config.js */
const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      '@/': path.resolve(__dirname, 'src/')
    }
  }
}
