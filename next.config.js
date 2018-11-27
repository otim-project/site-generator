const { getSiteConfig } = require('./meta')

module.exports = {
  exportPathMap: async function () {
    const siteConfig = await getSiteConfig();
    return siteConfig;
  }
}
