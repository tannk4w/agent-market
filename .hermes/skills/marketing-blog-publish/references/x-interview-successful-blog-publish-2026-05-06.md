# x-interview successful blog publish example — 2026-05-06

Use this as a compact known-good reference for future x-interview draft publishes with thumbnail + CKEditor inline image.

## Scenario

- Destination: `https://stg.x-interview.com/api/blogs`
- Content type: Vietnamese blog article, HTML content
- Publish intent: draft (`status=0`)
- Assets: 1 thumbnail file uploaded as `thumbnail`; 1 inline image uploaded first through CKEditor endpoint and embedded as a public x-interview temporary URL.

## Successful API result

- HTTP status: `201`
- Blog ID: `42`
- Slug: `top-10-cau-hoi-phong-van-nhan-su-hanh-chinh-20260506`
- URL pattern: `https://stg.x-interview.com/blog/{slug}`
- Response included `thumbnail_url` signed S3 URL.

## Working sequence

1. Generate or prepare article HTML with semantic tags (`h1`, `h2`, `p`, `blockquote`, `ul`, `figure`).
2. Upload inline images to `https://stg.x-interview.com/upload-ckeditor-image` before publishing:
   - Start a `requests.Session()`.
   - `GET https://stg.x-interview.com`.
   - Extract `<meta name="csrf-token" content="...">`.
   - `POST /upload-ckeditor-image` with:
     - headers: `X-CSRF-TOKEN`, `X-Requested-With: XMLHttpRequest`, `Accept: */*`, `Referer: https://stg.x-interview.com/`
     - files: `upload=@local-image.png`
     - data: `CKEditorFuncNum=1`, `_token={csrf}`
   - Parse returned script for `callFunction(1, 'URL', '')`.
3. Insert inline image as:
   ```html
   <figure>
     <img src="https://stg.x-interview.com/temporary-url-ckeditor-image?path=file.png" alt="..." style="max-width:100%;height:auto;" />
     <figcaption>...</figcaption>
   </figure>
   ```
4. Publish blog via multipart POST:
   - URL: `https://stg.x-interview.com/api/blogs`
   - header: `api-key: {raw X-INTERVIEW-KEY}`, `Accept: application/json`
   - data fields: `title`, `slug`, `content`, `status`, `published_at`, `meta_title`, `meta_description`, plus optional `excerpt`, `meta_keywords`
   - files: `thumbnail=@local-thumbnail.png`
5. Do not manually set `Content-Type`; let `requests` create multipart boundary.

## Pitfalls confirmed

- Local inline file paths must not be embedded in blog HTML.
- Inline images are not uploaded by the blog endpoint; upload them separately through CKEditor first.
- Blog thumbnail works as multipart field `thumbnail` on the blog create endpoint.
- Use raw `X-INTERVIEW-KEY` value in `api-key` header; do not prefix it.
