// Intentionally empty. Aliased over Next.js's bundled legacy polyfill module
// (next/dist/build/polyfills/polyfill-module) so modern Baseline browsers do
// not download ~14 KiB of Array.prototype.at / Object.hasOwn / trimStart etc.
// This project targets evergreen browsers only. Revert the alias in
// next.config.mjs if legacy browser support is ever required.
module.exports = {};
