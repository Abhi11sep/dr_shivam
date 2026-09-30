const fs=require('fs');
const p='src/app/page.js';let s=fs.readFileSync(p,'utf8');
s=s.replace(/^import (ResearchFocus|NewsUpdates).*\r?\n/gm,'').replace(/      \{\/\* Key Research Focus Domains \*\/\}\r?\n      <ResearchFocus \/>\r?\n/,'').replace(/      \{\/\* News & Announcements Timeline \*\/\}\r?\n      <NewsUpdates \/>\r?\n\r?\n/,'');fs.writeFileSync(p,s);
const n='src/components/Navbar.jsx';s=fs.readFileSync(n,'utf8').replace(/^    \{ name: "(?:Research Focus|Updates)",.*\r?\n/gm,'');fs.writeFileSync(n,s);
const f='src/components/Footer.jsx';s=fs.readFileSync(f,'utf8').replace('href="#research"','href="#research-work"').replace('<a href="#news">News</a>','');fs.writeFileSync(f,s);
fs.unlinkSync('src/components/ResearchFocus.jsx');fs.unlinkSync('src/components/NewsUpdates.jsx');
