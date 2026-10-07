// Each frame reshapes the same 12 tiles, preserving continuity between photos.
// Adjust duration or add focus frames here to tune the opening sequence.
export const introDuration = 20;
const count = 12;
function layout(columns, rows) {
  return Array.from({ length: count }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    return {
      left: columns.slice(0, column).reduce((a, b) => a + b, 0),
      top: rows.slice(0, row).reduce((a, b) => a + b, 0),
      width: columns[column], height: rows[row],
    };
  });
}
function focus(index, prominence = 76) {
  const columns = Array(4).fill((100 - prominence) / 3);
  const rows = Array(3).fill((100 - prominence) / 2);
  columns[index % 4] = prominence;
  rows[Math.floor(index / 4)] = prominence;
  return layout(columns, rows);
}
export const settledTiles = layout([23, 29, 27, 21], [33, 37, 30]);
const frames = [
  focus(0, 97),
  layout([16, 22, 44, 18], [20, 60, 20]),
  focus(6), focus(9), focus(2, 86), focus(7), focus(4, 86),
  focus(10), focus(1, 86), focus(8), focus(11, 86),
  layout([2, 48, 48, 2], [49, 49, 2]),
  focus(5, 96), settledTiles,
];
const rectCSS = rect => `left:${rect.left}%;top:${rect.top}%;width:${rect.width}%;height:${rect.height}%;`;
export const introKeyframes = Array.from({ length: count }, (_, index) =>
  `@keyframes gallery-tile-${index} {${frames.map((frame, step) =>
    `${(step / (frames.length - 1) * 100).toFixed(3)}% {${rectCSS(frame[index])}}` +
    (step < frames.length - 1 ? `${((step + 0.4) / (frames.length - 1) * 100).toFixed(3)}% {${rectCSS(frame[index])}}` : "")
  ).join("")}}`
).join("\n");

