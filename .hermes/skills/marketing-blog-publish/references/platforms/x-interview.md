# Platform Adapter: x-interview

Use this adapter when the publish destination is x-interview or the API endpoint is `https://stg.x-interview.com/api/blogs`.

## Platform Summary

- Platform: x-interview
- Blog API: `https://stg.x-interview.com/api/blogs`
- Base URL: `https://stg.x-interview.com`
- CKEditor inline image endpoint: `https://stg.x-interview.com/upload-ckeditor-image`
- Default publish preference for this user: `status=0` draft unless explicitly asked to publish live.
- API key env: `X-INTERVIEW-KEY`
- Auth header for `/api/blogs`: `api-key: {RAW_API_KEY}`

Important: use the raw key value in the `api-key` header. Do not prefix with `API_KEY=`. A request using `api-key: API_KEY={API_KEY}` returned 403, while `api-key: {API_KEY}` succeeded.

## Required Blog Fields

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| title | Yes | string | max 255 chars |
| slug | Yes | string | unique, URL-safe, max 255 chars |
| content | Yes | string | HTML preferred |
| status | Yes | integer/string | 0=draft, 1=published |
| published_at | Yes | date | YYYY-MM-DD |
| meta_title | Yes | string | target <= 60 chars |
| meta_description | Yes | string | SEO description |

Optional fields:

| Field | Type | Notes |
| --- | --- | --- |
| excerpt | string | max 500 chars |
| author_id | integer | must exist if used |
| meta_keywords | string | max 255 chars |
| tags[] | array | send as repeated multipart `tags[]` fields |
| thumbnail | file | jpeg,png,jpg,gif,svg; max 2MB |

## Content Format

Send semantic HTML in the `content` field.

Prefer CKEditor-like HTML:

```html
<h1><strong>Main title</strong></h1>
<h2><strong>Major section</strong></h2>
<h3><strong>Subsection</strong></h3>
<p>Body text...</p>
<ul><li>Item</li></ul>
<figure>
  <img src="PUBLIC_URL" alt="Mô tả ảnh" style="max-width:100%;height:auto;" />
  <figcaption>Chú thích nếu cần.</figcaption>
</figure>
```

Do not simulate headings with bold-only paragraphs or inline CSS font sizes. Use real `h1`, `h2`, `h3` tags so frontend/table-of-contents/SEO logic can detect them.

## Thumbnail Upload

`thumbnail` is a file field on `POST /api/blogs`.

If a thumbnail local file exists, send the blog request as `multipart/form-data`:

- All text fields as form fields.
- Thumbnail as `thumbnail=@/path/to/file.png`.
- Do not manually set `Content-Type`; let the HTTP client set multipart boundary.

If there is no thumbnail file, JSON can be used, but multipart is preferred when any file is present.

## Inline Images in Content

Do not place local file paths inside `content`.

For inline images:

1. Upload each local inline image to the CKEditor endpoint.
2. Parse the public/temporary URL returned by CKEditor.
3. Replace article placeholders such as `INLINE_IMAGE_1` with that URL.
4. Insert as `<figure><img src="URL" alt="..."><figcaption>...</figcaption></figure>`.
5. Store the x-interview temporary URL in content, not the short-lived redirected signed S3 URL.

### CKEditor Upload Pattern

A simple curl pattern:

```bash
curl -X POST "https://stg.x-interview.com/upload-ckeditor-image" \
  -F "upload=@/path/to/image.png" \
  -F "CKEditorFuncNum=1"
```

In scripted/server-side usage, the endpoint may return `419 CSRF token mismatch` unless a Laravel session and CSRF token are included. A working Python pattern:

```python
import re, requests, pathlib

s = requests.Session()
home = s.get('https://stg.x-interview.com', timeout=30)
csrf = re.search(r'name="csrf-token" content="([^"]+)"', home.text).group(1)

with open('/path/to/image.png', 'rb') as f:
    res = s.post(
        'https://stg.x-interview.com/upload-ckeditor-image',
        headers={
            'X-CSRF-TOKEN': csrf,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': '*/*',
            'Referer': 'https://stg.x-interview.com/',
        },
        files={'upload': (pathlib.Path('/path/to/image.png').name, f, 'image/png')},
        data={'CKEditorFuncNum': '1', '_token': csrf},
        timeout=60,
    )

image_url = re.search(r"callFunction\(\s*1\s*,\s*'([^']+)'", res.text).group(1)
```

Observed response form:

```html
<script>window.parent.CKEDITOR.tools.callFunction(1, 'https://stg.x-interview.com/temporary-url-ckeditor-image?path=file.png', '');</script>
```

## Publish Request Pattern

Python multipart example:

```python
import os, requests

api_key = os.environ['X-INTERVIEW-KEY']
fields = {
    'title': title,
    'slug': slug,
    'content': html_content,
    'status': '0',
    'published_at': '2026-05-06',
    'meta_title': meta_title,
    'meta_description': meta_description,
    'excerpt': excerpt,
    'meta_keywords': meta_keywords,
}
files = {'thumbnail': (thumbnail_path.name, open(thumbnail_path, 'rb'), 'image/png')}
res = requests.post(
    'https://stg.x-interview.com/api/blogs',
    headers={'api-key': api_key, 'Accept': 'application/json'},
    data=fields,
    files=files,
    timeout=120,
)
```

## Slug Rules

Generate a URL-safe slug:

- Lowercase.
- Remove Vietnamese accents.
- Convert `đ` to `d` before accent stripping.
- Remove special characters.
- Replace spaces with hyphens.
- Add timestamp/random suffix if uniqueness is uncertain.

Pitfall: naive Unicode normalization may remove `đ` instead of turning it into `d`, producing `e` instead of `de`. Handle `đ/Đ` explicitly.

## Error Handling

| Status | Meaning | Action |
| --- | --- | --- |
| 201 | Created | Return blog ID, slug, URL, status |
| 401/403 | Unauthorized | Check raw `api-key` header and env key |
| 422 | Validation | Parse `errors` object and show specific fields |
| 500 | Server error | Report message and suggest retry/admin check |

## Known Pitfalls

- Do not use `api_key`; use `api-key`.
- Do not use `api-key: API_KEY=...`; use raw key only.
- Do not embed local image paths in `content`.
- Do not assume thumbnail upload also uploads inline images.
- Do not embed base64 images in content unless explicitly testing sanitizer behavior.
- Do not use signed redirected S3 URLs in content; use the temporary x-interview CKEditor URL.
- Do not send non-semantic headings as styled paragraphs.
- Parse and report 422 validation errors field-by-field.

## Success Response

On success, return:

```json
{
  "success": true,
  "blog_id": 41,
  "title": "...",
  "slug": "...",
  "url": "https://stg.x-interview.com/blog/{slug}",
  "status": "draft",
  "published_at": "YYYY-MM-DD"
}
```
