/**
 * Markdown to HTML Converter
 * 
 * Chuyển đổi Markdown/Text sang HTML SEO
 * Chỉ convert khi content chưa phải HTML (không có < > tags)
 * 
 * Usage:
 *   const { convertToHtml } = require('./markdown-converter');
 *   const html = convertToHtml(markdownContent);
 */

function convertToHtml(content) {
  if (!content) return '';
  
  let html = content;
  
  // 1. Nếu đã là HTML → giữ nguyên
  if (html.includes('<') && html.includes('>') && html.match(/<[a-z]+[^>]*>/i)) {
    return html;
  }
  
  // 2. Chuyển đổi Markdown sang HTML
  
  // Heading transformations (phải làm trước bold/italic)
  html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/^\*\*\*$/gm, '<hr>');
  
  // Bold/Italic (phải làm sau headings)
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.*?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Strikethrough
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  
  // Unordered lists (phải làm trước ordered lists)
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Ordered lists
  html = html.replace(/^\s*(\d+)\.\s+(.*)$/gm, '<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, function(match) {
    if (match.includes('<ul>')) {
      return match; // Đã wrap bởi unordered list
    }
    return '<ol>' + match + '</ol>';
  });
  
  // Paragraphs (wrap các đoạn text không có tag)
  html = html.split('\n\n').map(para => {
    para = para.trim();
    if (!para) return '';
    if (para.match(/^<(h[1-6]|ul|ol|li|blockquote|pre|code|hr|img|a)/i)) {
      return para; // Đã có HTML tag
    }
    return '<p>' + para + '</p>';
  }).join('\n');
  
  // Clean up multiple newlines
  html = html.replace(/\n{3,}/g, '\n\n');
  
  return html;
}

// Apply format conversion dựa trên template field format
function applyFormat(value, format) {
  if (value === undefined || value === null) return '';
  
  const formatLower = format?.toLowerCase();
  
  switch (formatLower) {
    case 'html':
      return convertToHtml(value);
    case 'text':
      return String(value).trim();
    case 'number':
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    case 'date':
      return String(value); // YYYY-MM-DD
    case 'array':
      return Array.isArray(value) ? value : [value];
    case 'file':
      return value; // Giữ nguyên (file path)
    default:
      return value;
  }
}

module.exports = {
  convertToHtml,
  applyFormat
};
