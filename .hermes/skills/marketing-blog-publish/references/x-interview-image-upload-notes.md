# x-interview Image Upload Notes

Session finding: 2026-05-06

## Thumbnail upload

A local PNG was uploaded successfully to `POST https://stg.x-interview.com/api/blogs` using multipart/form-data with field name `thumbnail`.

Successful request shape:

```bash
curl -X POST https://stg.x-interview.com/api/blogs \
  -H "api-key: ${X_INTERVIEW_KEY}" \
  -H "Accept: application/json" \
  -F "title=Test thumbnail upload" \
  -F "slug=test-thumbnail-upload" \
  -F "content=<h1><strong>Test</strong></h1><p>Draft.</p>" \
  -F "status=0" \
  -F "published_at=2026-05-06" \
  -F "meta_title=Test thumbnail upload" \
  -F "meta_description=Test upload thumbnail." \
  -F "thumbnail=@/path/to/image.png"
```

Observed success response included:

- HTTP 201
- `data.thumbnail_url` as a signed S3 URL under `ai-interview-staging-storage.s3.ap-southeast-2.amazonaws.com/Blogs/...`

## Auth header quirk

The skill previously documented:

```text
api-key: API_KEY=${API_KEY}
```

That produced `403 Unauthorized` in testing.

The working form was raw key value:

```text
api-key: ${X_INTERVIEW_KEY}
```

## Inline images inside `content`

`/api/blogs` has been verified for `thumbnail` file upload only. For images inside article content:

1. Upload the local file/blob to a media/CKEditor/S3 upload endpoint if x-interview exposes one.
2. Take the returned public/S3 URL.
3. Insert HTML into `content`:

```html
<figure>
  <img src="PUBLIC_IMAGE_URL" alt="Mô tả ảnh" style="max-width:100%;height:auto;" />
  <figcaption>Chú thích nếu cần</figcaption>
</figure>
```

Do not assume embedding a blob/base64 image in `content` will upload it to S3. Base64 may be stripped and usually stores bulky image data in the DB instead of S3.
