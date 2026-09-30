const fs = require('fs');

const geo = JSON.parse(fs.readFileSync('public/education/uttar-pradesh.geojson', 'utf8'));
const polygons = geo.features.flatMap((feature) => {
  const geometry = feature.geometry;
  return geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
});
const points = polygons.flatMap((polygon) => polygon.flatMap((ring) => ring));
const lons = points.map(([lon]) => lon);
const lats = points.map(([, lat]) => lat);
const minLon = Math.min(...lons);
const maxLon = Math.max(...lons);
const minLat = Math.min(...lats);
const maxLat = Math.max(...lats);
const project = ([lon, lat]) => {
  const x = 70 + ((lon - minLon) / (maxLon - minLon)) * 660;
  const y = 390 - ((lat - minLat) / (maxLat - minLat)) * 320;
  return [x.toFixed(2), y.toFixed(2)];
};
const paths = polygons.map((polygon) => polygon.map((ring) => ring.map((point, i) => {
  const [x, y] = project(point);
  return `${i ? 'L' : 'M'}${x},${y}`;
}).join(' ') + ' Z').join(' '));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><title>Uttar Pradesh district map</title><g fill="#102b3d" stroke="#5d8aa3" stroke-width="0.8" stroke-linejoin="round">${paths.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
fs.writeFileSync('public/education/uttar-pradesh.svg', svg);
