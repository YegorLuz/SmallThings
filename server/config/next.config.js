module.exports = (phase, { defaultConfig }) => ({
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  staticFolder: '/assets',
  crossOrigin: 'anonymous',
});
