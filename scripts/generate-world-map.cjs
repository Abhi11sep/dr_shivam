// Source: Natural Earth ne_110m_land, public domain.
// https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
// Run from the project root: node scripts/generate-world-map.cjs
const fs = require('fs');
const geo = JSON.parse(fs.readFileSync('public/conferences/world-land.geojson', 'utf8'));
const project = ([lon, lat]) => [((lon + 180) * 800 / 360).toFixed(2), (25 + (90 - lat) * 400 / 180).toFixed(2)];
const paths = geo.features.flatMap(f => f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates)
  .map(poly => poly.map(ring => ring.map((p, i) => `${i ? 'L' : 'M'}${project(p).join(',')}`).join(' ') + 'Z').join(' '));
fs.writeFileSync('public/conferences/world-land.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><title>World coastlines — Natural Earth, public domain</title><g fill="#203a50" stroke="#60849b" stroke-width="0.65" stroke-linejoin="round">${paths.map(d => `<path d="${d}"/>`).join('')}</g></svg>`);
