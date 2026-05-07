# Marketing Blog Publish - Scripts

## Cấu Trúc

```
scripts/
├── index.js                 # Main export
├── blog-publisher.js        # Hàm chính để publish
├── template-parser.js       # Đọc & parse post-template.md
└── markdown-converter.js   # Convert Markdown sang HTML
```

## Cách Sử Dụng

### 1. Import toàn bộ package

```javascript
const { publishBlog } = require('./scripts');

const result = await publishBlog(blogContent, 'x-interview');
```

### 2. Import riêng từng module

```javascript
const { loadTemplate, parseFieldFormats, getApiKey } = require('./scripts/template-parser');
const { convertToHtml, applyFormat } = require('./scripts/markdown-converter');
const { publishBlog, generateSlug } = require('./scripts/blog-publisher');
```

### 3. Sử dụng trực tiếp từ index

```javascript
const scripts = require('./scripts');

const result = await scripts.publishBlog(blogContent, 'x-interview', {
  status: 1,
  apiKey: 'optional-key'
});
```

## API

### publishBlog(blogContent, brandSlug, options)

Publish blog post lên website.

**Parameters:**
- `blogContent` (Object): Content từ marketing-blog-article
- `brandSlug` (string): Tên brand (ví dụ: 'x-interview')
- `options` (Object): Tùy chọn
  - `apiKey` (string): Override API key
  - `status` (number): 0 = draft, 1 = published
  - `publishedAt` (string): Ngày đăng (YYYY-MM-DD)

**Returns:** Promise<Object> - Kết quả từ API

### loadTemplate(brandSlug)

Load template từ brand folder.

### parseFieldFormats(templateContent)

Parse template để lấy format của mỗi field.

### getApiKey(templateContent, providedApiKey)

Lấy API key từ template + environment.

### convertToHtml(content)

Convert Markdown sang HTML.

### applyFormat(value, format)

Áp dụng format conversion dựa trên template.

### generateSlug(title)

Generate URL slug từ title.

## Ví Dụ

```javascript
const { publishBlog, templateParser, markdownConverter } = require('./scripts');

// Load và parse template
const template = templateParser.loadTemplate('x-interview');
const fieldFormats = templateParser.parseFieldFormats(template);

// Convert content
const htmlContent = markdownConverter.convertToHtml(markdownContent);

// Hoặc publish trực tiếp
const result = await publishBlog({
  title: 'Bài viết mẫu',
  slug: 'bai-viet-mau',
  content: '# Tiêu đề\n\nNội dung...',
  metaTitle: 'Bài viết mẫu - SEO',
  metaDescription: 'Mô tả SEO'
}, 'x-interview');

console.log(result);
```
