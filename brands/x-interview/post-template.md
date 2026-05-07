# X-Interview Blog Post Template

## API Configuration

| Field | Value |
|-------|-------|
| **API Endpoint** | https://stg.x-interview.com/api/blogs |
| **API Key Env** | X-INTERVIEW-KEY |
| **Authentication** | Header: `api-key: {API_KEY}` |

## Content-Type

**IMPORTANT:** Use `multipart/form-data` (NOT application/json)

## Required Fields

| Field | Type | Max Length | Notes |
|-------|------|------------|-------|
| title | string | 255 chars | Blog post title |
| slug | string | 255 chars | URL slug (unique) |
| content | string | - | HTML content |
| status | integer | - | 0 = Draft, 1 = Published |
| published_at | date | - | Format: YYYY-MM-DD |
| meta_title | string | 60 chars | SEO title |
| meta_description | string | - | SEO description |

## Optional Fields

| Field | Type | Max Length |
|-------|------|------------|
| excerpt | string | 500 chars |
| author_id | integer | - |
| meta_keywords | string | 255 chars |
| tags[] | array | - |
| thumbnail | file | 2MB (jpeg,png,jpg,gif,svg) |

## Content Formatting Notes

### CKEditor-compatible headings for table of contents

Manual x-interview posts created through CKEditor store real semantic heading tags in `content`, commonly like:

```html
<h1><strong>Main section title</strong></h1>
<h3><strong>Question or subsection title</strong></h3>
```

When publishing via API, the `content` field should mimic CKEditor semantic HTML so the frontend/table-of-contents logic can detect headings.

Do:

```html
<h1><strong>Main section title</strong></h1>
<h2><strong>Major section title</strong></h2>
<h3><strong>Question or subsection title</strong></h3>
<p>Body paragraph...</p>
```

Avoid using bold paragraphs or inline font-size as headings:

```html
<p><strong>This looks like a heading but is not semantic</strong></p>
<p style="font-size: 24px">This only changes visual size</p>
```

Suggested x-interview convention:
- One article/main group title: `<h1><strong>...</strong></h1>`
- Main blog sections: `<h2><strong>...</strong></h2>`
- Interview questions/subsections: `<h3><strong>...</strong></h3>`
- Body content: `<p>...</p>`

## Example cURL (multipart/form-data)

```bash
curl -X POST https://stg.x-interview.com/api/blogs \
  -H "api-key: 86f7e437faa5a7fce15d1ddcb9eaeaea377667b8" \
  -H "Accept: application/json" \
  -F "title=Bài viết của bạn" \
  -F "slug=slug-cua-ban" \
  -F "content=<h2>Nội dung</h2><p>..."</p>" \
  -F "status=0" \
  -F "published_at=2026-05-06" \
  -F "meta_title=SEO Title" \
  -F "meta_description=SEO Description"
```

## Example Python

```python
import requests

url = "https://stg.x-interview.com/api/blogs"
api_key = "86f7e437faa5a7fce15d1ddcb9eaeaea377667b8"

data = {
    "title": "Bài viết của bạn",
    "slug": "slug-cua-ban",
    "content": "<h2>Nội dung</h2><p>...</p>",
    "status": 0,
    "published_at": "2026-05-06",
    "meta_title": "SEO Title",
    "meta_description": "SEO Description"
}

response = requests.post(
    url, 
    data=data,  # Sử dụng data= (không phải json=)
    headers={"api-key": api_key, "Accept": "application/json"}
)
```
