#!/usr/bin/env node
/**
 * UTM Tagging Script for DELE B2 Marketing Site
 * 
 * Scans all HTML files and adds UTM parameters to App Store links.
 * Run: node scripts/tag-ctas.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '..');
const APP_STORE_BASE = 'https://apps.apple.com/app/id6772564355';

function getUtmParams(filePath, ctaName) {
  // Determine source from file path
  let medium = 'website';
  let source = 'b2.prepdele.com';
  
  // Determine campaign from directory
  let campaign = 'dele-b2-site';
  
  // Determine content from CTA data attribute or page
  let content = ctaName || path.basename(path.dirname(filePath));
  
  return `utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_content=${content}`;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Match App Store links without UTM params
  const regex = /(href=["'])(https:\/\/apps\.apple\.com\/app\/id\d+)(["'])/g;
  
  content = content.replace(regex, (match, prefix, url, suffix) => {
    // Skip if already has UTM params
    if (url.includes('utm_')) return match;
    
    // Get data-cta attribute if present nearby
    const ctaMatch = content.substring(
      Math.max(0, content.indexOf(match) - 100),
      content.indexOf(match) + match.length + 50
    ).match(/data-cta=["']([^"']+)["']/);
    
    const ctaName = ctaMatch ? ctaMatch[1] : path.basename(path.dirname(filePath));
    const utmParams = getUtmParams(filePath, ctaName);
    const newUrl = `${url}?${utmParams}`;
    
    modified = true;
    return `${prefix}${newUrl}${suffix}`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Tagged: ${path.relative(SITE_DIR, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.git' || file === 'scripts') continue;
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      processFile(filePath);
    }
  }
}

console.log('🏷️  Tagging App Store CTAs with UTM parameters...\n');
walkDir(SITE_DIR);
console.log('\n✅ Done!');
