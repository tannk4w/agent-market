/**
 * Template Parser - Đọc và parse post-template.md để lấy field formats
 * 
 * Usage:
 *   const { loadTemplate, parseFieldFormats, getApiKey } = require('./template-parser');
 *   const fieldFormats = parseFieldFormats(templateContent);
 *   const apiKey = getApiKey(templateContent, providedApiKey);
 */

const fs = require('fs');
const path = require('path');

// Load ~/.hermes/.env explicitly because gateway/systemd/terminal subprocesses
// may not expose user .env values to standalone Node publish scripts.
try {
  require('dotenv').config({
    path: path.join(process.env.HERMES_HOME || path.join(process.env.HOME || process.env.USERPROFILE, '.hermes'), '.env'),
    override: false
  });
} catch (_) {
  // dotenv is optional; callers can still provide apiKey directly or export env vars.
}

// Load template từ brand folder
function loadTemplate(brandSlug) {
  const templatePath = path.join(
    process.env.HOME || process.env.USERPROFILE,
    '.hermes',
    'brands',
    brandSlug,
    'post-template.md'
  );
  
  if (!fs.existsSync(templatePath)) {
    return null;
  }
  
  return fs.readFileSync(templatePath, 'utf-8');
}

// Parse template để lấy Format của mỗi field
function parseFieldFormats(templateContent) {
  const fieldFormats = {};
  
  // Parse Required Fields table
  // Format: | field | type | length | format | notes |
  const requiredMatch = templateContent.match(/## Required Fields[\s\S]*?(?:=+|\n##)/);
  if (requiredMatch) {
    const lines = requiredMatch[0].split('\n');
    lines.forEach(line => {
      const match = line.match(/\| (\w+) \| \w+ \| \d+ \| (\w+) \|/);
      if (match) {
        fieldFormats[match[1]] = match[2];
      }
    });
  }
  
  // Parse Optional Fields table
  const optionalMatch = templateContent.match(/## Optional Fields[\s\S]*?(?:=+|\n##|$)/);
  if (optionalMatch) {
    const lines = optionalMatch[0].split('\n');
    lines.forEach(line => {
      const match = line.match(/\| (\w+)(\[\])? \| \w+ \| \d+ \| (\w+) \|/);
      if (match) {
        fieldFormats[match[1]] = match[3];
      }
    });
  }
  
  return fieldFormats;
  // Ví dụ: { title: 'text', content: 'html', status: 'number', tags: 'array' }
}

// Lấy API key từ template + environment
function getApiKey(templateContent, providedApiKey) {
  // 1. Ưu tiên: user cung cấp trực tiếp
  if (providedApiKey) {
    return providedApiKey;
  }
  
  // 2. Đọc tên env từ template (ví dụ: X-INTERVIEW-KEY)
  const envMatch = templateContent.match(/API Key Env\s*\|\s*\*\*?([A-Z_-]+)\*\*?\s*\(/);
  if (envMatch) {
    const envName = envMatch[1];
    const apiKey = process.env[envName];
    if (apiKey) {
      return apiKey;
    }
  }
  
  // 3. Thử các pattern khác
  const altMatch = templateContent.match(/API Key Env\s*\|\s*([A-Z_-]+)/);
  if (altMatch) {
    const envName = altMatch[1];
    const apiKey = process.env[envName];
    if (apiKey) {
      return apiKey;
    }
  }
  
  throw new Error(
    'API key not found. Provide apiKey or set the env variable defined in post-template.'
  );
}

// Lấy Base URL từ template
function getBaseUrl(templateContent) {
  const match = templateContent.match(/Base URL\s*\|\s*(https?:\/\/[^\s|]+)/);
  return match ? match[1] : null;
}

// Lấy API endpoint từ template
function getEndpoint(templateContent) {
  const match = templateContent.match(/Endpoint\s*\|\s*(\/[^\s|]+)/);
  return match ? match[1] : null;
}

module.exports = {
  loadTemplate,
  parseFieldFormats,
  getApiKey,
  getBaseUrl,
  getEndpoint
};
