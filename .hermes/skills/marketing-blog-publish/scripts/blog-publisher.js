/**
 * Blog Publisher - Main module để publish bài viết lên website
 * 
 * Usage:
 *   const { publishBlog } = require('./blog-publisher');
 *   const result = await publishBlog(blogContent, brandSlug, options);
 * 
 * Options:
 *   - apiKey: Override API key (ưu tiên cao nhất)
 *   - status: 0 = draft, 1 = published (default: 1)
 *   - publishedAt: Ngày đăng (default: hôm nay)
 */

const { loadTemplate, parseFieldFormats, getApiKey, getBaseUrl, getEndpoint } = require('./template-parser');
const { applyFormat } = require('./markdown-converter');

/**
 * Publish blog post lên website
 * 
 * @param {Object} blogContent - Object chứa content từ marketing-blog-article
 * @param {string} brandSlug - Tên brand (ví dụ: 'x-interview')
 * @param {Object} options - Các tùy chọn bổ sung
 * @returns {Promise<Object>} - Kết quả từ API
 */
async function publishBlog(blogContent, brandSlug, options = {}) {
  // 1. Load template
  const templateContent = loadTemplate(brandSlug);
  if (!templateContent) {
    throw new Error(`Template not found for brand: ${brandSlug}`);
  }
  
  // 2. Parse template để lấy field formats
  const fieldFormats = parseFieldFormats(templateContent);
  
  // 3. Lấy API key
  const apiKey = getApiKey(templateContent, options.apiKey);
  
  // 4. Lấy API config
  const baseUrl = getBaseUrl(templateContent);
  const endpoint = getEndpoint(templateContent);
  
  if (!baseUrl || !endpoint) {
    throw new Error('Invalid template: missing Base URL or Endpoint');
  }
  
  // 5. Prepare data với format conversion
  const blogData = prepareBlogData(blogContent, fieldFormats, options);
  
  // 6. Gọi API
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'api-key': `API_KEY=${apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blogData)
  });
  
  // 7. Handle response
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${JSON.stringify(result)}`);
  }
  
  return result;
}

/**
 * Chuẩn bị data với format conversion
 */
function prepareBlogData(blogContent, fieldFormats, options) {
  // Map các field thông thường
  const fieldMapping = {
    title: 'title',
    slug: 'slug',
    content: 'content',
    excerpt: 'excerpt',
    status: 'status',
    published_at: 'publishedAt',
    meta_title: 'metaTitle',
    meta_description: 'metaDescription',
    meta_keywords: 'keywords',
    tags: 'tags',
    thumbnail: 'thumbnailPath',
    author_id: 'authorId'
  };
  
  const blogData = {};
  
  // Apply format cho từng field
  for (const [apiField, contentField] of Object.entries(fieldMapping)) {
    if (blogContent[contentField] !== undefined) {
      const format = fieldFormats[apiField];
      blogData[apiField] = applyFormat(blogContent[contentField], format);
    }
  }
  
  // Apply options overrides
  if (options.status !== undefined) {
    blogData.status = options.status;
  }
  
  if (options.publishedAt) {
    blogData.published_at = options.publishedAt;
  } else if (!blogData.published_at) {
    blogData.published_at = new Date().toISOString().split('T')[0];
  }
  
  // Default values
  if (blogData.status === undefined) {
    blogData.status = 1;
  }
  
  // Handle meta_keywords (có thể là array hoặc comma-separated string)
  if (Array.isArray(blogData.meta_keywords)) {
    blogData.meta_keywords = blogData.meta_keywords.join(',');
  }
  
  // Handle tags (phải là array)
  if (blogData.tags && typeof blogData.tags === 'string') {
    blogData.tags = blogData.tags.split(',').map(t => t.trim());
  }
  
  return blogData;
}

/**
 * Generate slug từ title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
    .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
    .replace(/[ìíỉĩị]/g, 'i')
    .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
    .replace(/[ùúủũụưừứửữự]/g, 'u')
    .replace(/[ỳýỷỹỵ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

module.exports = {
  publishBlog,
  prepareBlogData,
  generateSlug
};

// Export individual functions for modular usage
module.exports.templateParser = require('./template-parser');
module.exports.markdownConverter = require('./markdown-converter');
