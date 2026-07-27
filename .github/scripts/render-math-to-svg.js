// render-math-to-svg.js
// Scans .md files for $$...$$ and $...$ LaTeX math,
// renders to SVG via mathjax-node, saves SVGs, rewrites .md.
// Usage: node render-math-to-svg.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const SVG_DIR = 'math_svgs';

const DISPLAY_RE = /\$\$([\s\S]*?)\$\$/g;
const INLINE_RE = /(?<!\$)\$(?!\$)([^$]+?)(?<!\$)\$(?!\$)/g;

function hash(s) { return crypto.createHash('md5').update(s.replace(/\s+/g,' ').trim()).digest('hex').substring(0,12); }

async function render(mjAPI, math, isDisplay) {
  return new Promise(resolve => {
    mjAPI.typeset({ math, format:'TeX', svg:true, ex:6, display:isDisplay }, d => {
      if (d.errors || !d.svg || d.svg.length < 50) { resolve(null); return; }
      // Strip currentColor AND inject light fill for dark backgrounds
      // Also remove duplicate xmlns attrib that mathjax-node sometimes adds
      const svg = d.svg
        .replace(/ fill="currentColor"/g, '')
        .replace(/ stroke="currentColor"/g, '')
        .replace(/fill="currentColor"/g, '')
        .replace(/stroke="currentColor"/g, '')
        .replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '')
        .replace(/<svg /, '<svg fill="#e0e4ef" stroke="#e0e4ef" xmlns="http://www.w3.org/2000/svg" ')
        .replace(/<g /g, '<g fill="#e0e4ef" stroke="#e0e4ef" ');
      resolve(svg);
    });
  });
}

async function processFile(mjAPI, filePath) {
  let content;
  try { content = fs.readFileSync(filePath, 'utf8'); } catch(e) { console.log(filePath+' cannot read'); return; }
  const fileDir = path.dirname(filePath);
  const svgDir = path.join(fileDir, SVG_DIR);
  if (!fs.existsSync(svgDir)) fs.mkdirSync(svgDir, { recursive: true });

  // Build the raw GitHub URL prefix from the relative path
  // e.g. "Information Geometry of Softmax/math_svgs/" → raw.githubusercontent.com/.../main/...
  const svgUrlPrefix = SVG_DIR + '/';  // relative URL for markdown ![alt](path)

  const replaces = [];
  const usedRanges = []; // track {start, end} positions already claimed

  DISPLAY_RE.lastIndex = 0;
  while ((m = DISPLAY_RE.exec(content)) !== null) {
    const expr = m[1].trim(); if (!expr) continue;
    const svg = await render(mjAPI, expr, true); if (!svg) continue;
    const fn = 'd'+hash(expr)+'.svg';
    fs.writeFileSync(path.join(svgDir,fn), svg, 'utf8');
    replaces.push({from:m[0], to:'\n![equation](math_svgs/'+fn+')\n'});
    usedRanges.push({start: m.index, end: m.index + m[0].length});
  }

  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(content)) !== null) {
    const expr = m[1].trim(); if (!expr) continue;
    const start = m.index, end = start + m[0].length;
    // Skip if this range overlaps any already-used range
    if (usedRanges.some(r => start >= r.start && end <= r.end)) continue;
    if (usedRanges.some(r => !(end <= r.start || start >= r.end))) continue;
    usedRanges.push({start, end});
    const svg = await render(mjAPI, expr, false); if (!svg) continue;
    const fn = 'i'+hash(expr)+'.svg';
    fs.writeFileSync(path.join(svgDir,fn), svg, 'utf8');
    replaces.push({from:m[0], to:'![eq](math_svgs/'+fn+')'});
  }

  if (replaces.length > 0) {
    let nc = content;
    const sorted = replaces.map(r=>({...r,idx:content.indexOf(r.from)})).filter(r=>r.idx>=0).sort((a,b)=>b.idx-a.idx);
    // Deduplicate: skip replacements at the same position
    const seen = new Set();
    for (const r of sorted) {
      if (seen.has(r.idx)) continue;
      seen.add(r.idx);
      nc = nc.substring(0,r.idx) + r.to + nc.substring(r.idx+r.from.length);
    }
    fs.writeFileSync(filePath, nc, 'utf8');
    console.log(filePath + ' — ' + seen.size + ' expressions');
  }
}

async function main() {
  const mj = require('mathjax-node'); mj.config({MathJax:{}}); mj.start();
  const glob = require('glob');
  const files = glob.sync('**/*.md', { ignore:['**/node_modules/**','**/.git/**','**/math_svgs/**'], nodir:true })
    .filter(f=>!f.includes('node_modules'));
  console.log('Found '+files.length+' files\n');
  for (const f of files) await processFile(mj, f);
  console.log('\nDone!');
}

main().catch(e => { console.error(e); process.exit(1); });