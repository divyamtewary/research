// render-math-to-svg.js
// Scans .md and .html files for LaTeX math ($$...$$ and $...$),
// renders them to SVG images using KaTeX, saves SVGs alongside
// the original files, and rewrites files to reference the SVGs.
// Usage: node render-math-to-svg.js '<glob-pattern>'

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Configuration ──
const MATH_CACHE_DIR = path.join(process.cwd(), '.latex-svg-cache');
const SVG_DIR = 'math_svgs'; // subdirectory within each file's folder

// ── Ensure KaTeX is installed ──
function ensureKatex() {
  try {
    require.resolve('katex');
  } catch (e) {
    console.log('Installing KaTeX...');
    execSync('npm install katex', { cwd: process.cwd(), stdio: 'inherit' });
  }
}

// ── Math expression detection ──
// Pattern for display math: $$...$$
const DISPLAY_MATH_RE = /\$\$([\s\S]*?)\$\$/g;
// Pattern for inline math: $...$ (not $$)
const INLINE_MATH_RE = /(?<!\$)\$(?!\$)([^$]+?)(?<!\$)\$(?!\$)/g;

// ── Generate a deterministic filename from math content ──
function mathHash(mathExpr, isDisplay) {
  const prefix = isDisplay ? 'd' : 'i';
  let hash = 0;
  const str = (isDisplay ? '$$\n' : '$') + mathExpr + (isDisplay ? '\n$$' : '$');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `${prefix}${Math.abs(hash).toString(36)}.svg`;
}

// ── Render math to SVG using KaTeX ──
function renderToSvg(mathExpr, isDisplay) {
  const katex = require('katex');
  const hash = mathHash(mathExpr, isDisplay);
  
  // Check if already cached
  // (We don't cache during a single run since we process in memory)
  
  const options = {
    throwOnError: false,
    displayMode: isDisplay,
    output: 'svg',
    trust: true,
    strict: false,
    maxSize: 100,
    maxExpand: 50
  };
  
  try {
    const svg = katex.renderToString(mathExpr, options);
    return { svg, hash };
  } catch (err) {
    console.error(`  ⚠ KaTeX error for: "${mathExpr.substring(0, 60)}..." — ${err.message}`);
    return null;
  }
}

// ── Extract hash from SVG filename in existing <img> tag ──
function extractHashFromImgTag(line) {
  const match = line.match(/src="[^"]*\/([di][a-z0-9]+\.svg)"/);
  return match ? match[1] : null;
}

// ── Process a single file ──
function processFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`  ❌ Cannot read file: ${err.message}`);
    return;
  }
  
  const ext = path.extname(filePath).toLowerCase();
  const isHtml = ext === '.html';
  const isMd = ext === '.md';
  if (!isHtml && !isMd) return;
  
  // Create SVG output directory alongside the file
  const fileDir = path.dirname(filePath);
  const svgOutDir = path.join(fileDir, SVG_DIR);
  if (!fs.existsSync(svgOutDir)) {
    fs.mkdirSync(svgOutDir, { recursive: true });
  }
  
  // Track replacements
  const replacements = [];
  let match;
  
  // Process display math $$...$$
  DISPLAY_MATH_RE.lastIndex = 0;
  while ((match = DISPLAY_MATH_RE.exec(content)) !== null) {
    const mathExpr = match[1].trim();
    if (!mathExpr) continue;
    
    const result = renderToSvg(mathExpr, true);
    if (!result) continue;
    
    const svgPath = path.join(svgOutDir, result.hash);
    // Ensure the SVG path is relative to the file for the HTML/MD reference
    const relativeSvgPath = `${SVG_DIR}/${result.hash}`;
    
    const fullMatch = match[0];
    const replacement = `\n<img src="${relativeSvgPath}" alt="LaTeX: ${mathExpr.replace(/"/g, '&quot;').replace(/\n/g, ' ').substring(0, 80)}" style="display:block;margin:1em auto;max-width:100%" />\n`;
    
    replacements.push({ from: fullMatch, to: replacement, mathExpr });
    
    // Save SVG
    const svgFilePath = path.join(svgOutDir, result.hash);
    // Extract just the <svg> tag from KaTeX output
    const svgMatch = result.svg.match(/<svg[\s\S]*?<\/svg>/);
    if (svgMatch) {
      fs.writeFileSync(svgFilePath, svgMatch[0], 'utf8');
    }
  }
  
  // Process inline math $...$ (only if not already processed by display math)
  // We need to be careful not to double-process
  const processedContent = content;
  INLINE_MATH_RE.lastIndex = 0;
  while ((match = INLINE_MATH_RE.exec(processedContent)) !== null) {
    const mathExpr = match[1].trim();
    if (!mathExpr) continue;
    
    // Check if this is inside a display math block that was already replaced
    // (Simple heuristic: skip if the match overlaps with a display math replacement)
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;
    let overlaps = false;
    for (const rep of replacements) {
      const repStart = content.indexOf(rep.from);
      if (repStart >= 0) {
        const repEnd = repStart + rep.from.length;
        if (matchStart >= repStart && matchEnd <= repEnd) {
          overlaps = true;
          break;
        }
      }
    }
    if (overlaps) continue;
    
    const result = renderToSvg(mathExpr, false);
    if (!result) continue;
    
    const relativeSvgPath = `${SVG_DIR}/${result.hash}`;
    const fullMatch = match[0];
    const replacement = `<img src="${relativeSvgPath}" alt="LaTeX: ${mathExpr.replace(/"/g, '&quot;').substring(0, 60)}" style="display:inline;vertical-align:middle;max-width:100%" />`;
    
    replacements.push({ from: fullMatch, to: replacement, mathExpr });
    
    // Save SVG
    const svgFilePath = path.join(svgOutDir, result.hash);
    const svgMatch = result.svg.match(/<svg[\s\S]*?<\/svg>/);
    if (svgMatch) {
      fs.writeFileSync(svgFilePath, svgMatch[0], 'utf8');
    }
  }
  
  // Apply replacements in reverse order (to preserve indices)
  if (replacements.length > 0) {
    let newContent = content;
    // Sort replacements by position in reverse
    const sortedReplacements = [];
    for (const rep of replacements) {
      const idx = newContent.indexOf(rep.from);
      if (idx >= 0) {
        sortedReplacements.push({ idx, from: rep.from, to: rep.to });
      }
    }
    sortedReplacements.sort((a, b) => b.idx - a.idx);
    
    for (const rep of sortedReplacements) {
      newContent = newContent.substring(0, rep.idx) + rep.to + newContent.substring(rep.idx + rep.from.length);
    }
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✅ Replaced ${replacements.length} math expressions → SVGs in ${SVG_DIR}/`);
  } else {
    console.log(`  ℹ️  No math expressions found`);
  }
}

// ── Main ──
function main() {
  const glob = require('glob');
  
  // Get file patterns from command line args or use defaults
  const patterns = process.argv.slice(2);
  if (patterns.length === 0) {
    patterns.push('**/*.md');
    patterns.push('**/*.html');
  }
  
  // Exclude node_modules, .git, etc.
  const ignorePatterns = ['**/node_modules/**', '**/.git/**', '**/math_svgs/**'];
  
  let files = [];
  for (const pattern of patterns) {
    const matched = glob.sync(pattern, { ignore: ignorePatterns, nodir: true });
    files = files.concat(matched);
  }
  
  // Deduplicate
  files = [...new Set(files)];
  
  console.log(`Found ${files.length} files to process`);
  
  for (const file of files) {
    processFile(file);
  }
  
  console.log('\n✅ Done!');
}

// ── Run ──
ensureKatex();
main();