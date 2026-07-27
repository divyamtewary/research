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
      resolve((!d.errors && d.svg && d.svg.length > 50) ? d.svg : null);
    });
  });
}

async function processFile(mjAPI, filePath) {
  let content;
  try { content = fs.readFileSync(filePath, 'utf8'); } catch(e) { console.log(filePath+' cannot read'); return; }
  const fileDir = path.dirname(filePath);
  const svgDir = path.join(fileDir, SVG_DIR);
  if (!fs.existsSync(svgDir)) fs.mkdirSync(svgDir, { recursive: true });
  const reps = []; let m;

  DISPLAY_RE.lastIndex = 0;
  while ((m = DISPLAY_RE.exec(content)) !== null) {
    const expr = m[1].trim(); if (!expr) continue;
    const svg = await render(mjAPI, expr, true); if (!svg) continue;
    const fn = 'd'+hash(expr)+'.svg';
    fs.writeFileSync(path.join(svgDir,fn), svg, 'utf8');
    reps.push({from:m[0], to:'<img src="'+SVG_DIR+'/'+fn+'" alt="math" style="display:block;margin:1em auto;max-width:100%"/>'});
  }

  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(content)) !== null) {
    const expr = m[1].trim(); if (!expr) continue;
    const svg = await render(mjAPI, expr, false); if (!svg) continue;
    const fn = 'i'+hash(expr)+'.svg';
    fs.writeFileSync(path.join(svgDir,fn), svg, 'utf8');
    reps.push({from:m[0], to:'<img src="'+SVG_DIR+'/'+fn+'" alt="math" style="display:inline;vertical-align:middle;max-width:100%"/>'});
  }

  if (reps.length > 0) {
    let nc = content;
    reps.map(r=>({...r,idx:content.indexOf(r.from)})).filter(r=>r.idx>=0).sort((a,b)=>b.idx-a.idx).forEach(r=>{
      nc = nc.substring(0,r.idx) + r.to + nc.substring(r.idx+r.from.length);
    });
    fs.writeFileSync(filePath, nc, 'utf8');
    console.log(filePath + ' — ' + reps.length + ' expressions');
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