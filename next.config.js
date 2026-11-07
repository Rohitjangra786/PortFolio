const path = require('path')

module.exports = {
  outputFileTracingRoot: path.join(__dirname),
  images: { formats: ['image/avif', 'image/webp'] },
  // These pages became sections of the home page, so old links land on the right section.
  async redirects() {
    return ['about', 'services', 'work', 'research', 'contact'].map((section) => ({
      source: `/${section}`,
      destination: `/#${section}`,
      permanent: false,
    }))
  },
}
