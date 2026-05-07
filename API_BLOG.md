# Blog API Documentation

## Overview

The Blog API provides endpoints for managing blog posts programmatically. All endpoints require API key authentication.

**Base URL:** `https://stg.x-interview.com/api`

---

## Authentication

All API requests must include the API key in the request header.

**Header format:**

```
api-key: API_KEY=your_api_key
```

_Note: Nginx may drop headers with underscores. Use `api-key` (hyphen) instead of `api_key` (underscore) if experiencing authorization issues._

---

## Endpoints

### 1. List All Blogs

Retrieve a list of all blog posts.

**Request:**

```http
GET /blogs
```

**Headers:**

```
api-key: your_api_key
Accept: application/json
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "title": "Marketing Trends 2026 - Part 2",
      "slug": "marketing-trends-2026-part-2",
      "excerpt": null,
      "status": 1,
      "published_at": "2026-04-29 00:00:00",
      "thumbnail_url": null,
      "author_name": "Trần Quang Huy",
      "created_at": "2026-04-29 10:40:00"
    }
  ]
}
```

---

### 2. Create New Blog Post

Create a new blog post with optional thumbnail upload.

**Request:**

```http
POST /blogs
Content-Type: multipart/form-data
```

**Headers:**

```
api-key: your_api_key
Accept: application/json
```

**Parameters:**

| Field            | Type    | Required | Description                                      |
| ---------------- | ------- | -------- | ------------------------------------------------ |
| title            | string  | Yes      | Blog post title (max 255 chars)                  |
| slug             | string  | Yes      | URL slug (max 255 chars, unique)                 |
| content          | string  | Yes      | Blog post content (HTML supported)               |
| excerpt          | string  | No       | Short excerpt (max 500 chars)                    |
| status           | integer | Yes      | 0 = Draft, 1 = Published                         |
| published_at     | date    | Yes      | Publication date (Y-m-d format)                  |
| author_id        | integer | No       | ID of blog author (exists in blog_authors table) |
| meta_title       | string  | Yes      | SEO meta title (max 60 chars)                    |
| meta_description | string  | Yes      | SEO meta description                             |
| meta_keywords    | string  | No       | SEO meta keywords (max 255 chars)                |
| tags[]           | array   | No       | Array of tags (each max 50 chars)                |
| thumbnail        | file    | No       | Featured image (jpeg,png,jpg,gif,svg, max 2MB)   |

**Example Request (with thumbnail):**

```bash
curl -X POST http://ai-interview.local.abc:8000/api/blogs \
  -H "api-key: your_api_key" \
  -H "Accept: application/json" \
  -F "title=My Blog Post" \
  -F "slug=my-blog-post" \
  -F "content=<h2>Introduction</h2><p>This is the content.</p>" \
  -F "excerpt=Brief summary of the post" \
  -F "status=1" \
  -F "published_at=2026-04-29" \
  -F "author_id=2" \
  -F "meta_title=My Blog Post | SEO Title" \
  -F "meta_description=This is a great blog post about..." \
  -F "meta_keywords=marketing,digital,2026" \
  -F "tags[]=marketing" \
  -F "tags[]=trends" \
  -F "thumbnail=@/path/to/image.jpg"
```

**Example Request (JSON, no thumbnail):**

```bash
curl -X POST http://ai-interview.local.abc:8000/api/blogs \
  -H "api-key: your_api_key" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "content": "<h2>Introduction</h2><p>Content here</p>",
    "status": 1,
    "published_at": "2026-04-29",
    "meta_title": "My Blog Post",
    "meta_description": "Description here"
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": 3,
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "excerpt": null,
    "status": 1,
    "published_at": "2026-04-29 00:00:00",
    "thumbnail_url": null
  }
}
```

---

### 3. Get Single Blog Post

Retrieve details of a specific blog post.

**Request:**

```http
GET /blogs/{id}
```

**Headers:**

```
api-key: your_api_key
Accept: application/json
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Marketing Trends 2026 - Part 2",
    "slug": "marketing-trends-2026-part-2",
    "excerpt": null,
    "content": "<h2>AI in Marketing</h2><p>Content here</p>",
    "author_id": 2,
    "author_name": "Trần Quang Huy",
    "status": 1,
    "published_at": "2026-04-29 00:00:00",
    "meta_title": "Marketing Trends 2026 - Part 2",
    "meta_description": "Part 2 of our marketing trends series",
    "meta_keywords": null,
    "tags": null,
    "thumbnail_url": null,
    "created_at": "2026-04-29 10:40:00",
    "updated_at": "2026-04-29 10:40:00"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "message": "Blog not found"
}
```

---

### 4. Update Blog Post

Update an existing blog post. Supports partial updates via PUT or PATCH.

**Request:**

```http
PUT /blogs/{id}
PATCH /blogs/{id}
Content-Type: multipart/form-data
```

**Headers:**

```
api-key: your_api_key
Accept: application/json
```

**Parameters:** Same as Create, all optional except validation rules still apply.

**Example Request:**

```bash
curl -X PUT http://ai-interview.local.abc:8000/api/blogs/2 \
  -H "api-key: your_api_key" \
  -H "Accept: application/json" \
  -F "title=Updated Title" \
  -F "content=<p>Updated content</p>" \
  -F "status=1" \
  -F "published_at=2026-04-29" \
  -F "meta_title=Updated Meta Title" \
  -F "meta_description=Updated description"
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "data": {
    "id": 2,
    "title": "Updated Title",
    "slug": "marketing-trends-2026-part-2",
    "excerpt": null,
    "status": 1,
    "published_at": "2026-04-29 00:00:00",
    "thumbnail_url": null
  }
}
```

---

### 5. Delete Blog Post

Delete a blog post and its associated thumbnail from S3.

**Request:**

```http
DELETE /blogs/{id}
```

**Headers:**

```
api-key: your_api_key
Accept: application/json
```

**Example Request:**

```bash
curl -X DELETE http://ai-interview.local.abc:8000/api/blogs/2 \
  -H "api-key: your_api_key" \
  -H "Accept: application/json"
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

---

## Blog Authors API

### List All Authors

**Request:**

```http
GET /blog-authors
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "X Interview",
      "slug": "x-interview",
      "avatar_url": null
    }
  ]
}
```

### Get Author with Blogs

**Request:**

```http
GET /blog-authors/{id}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Trần Quang Huy",
    "slug": "tran-quang-huy",
    "self_introduce": "Intro text here",
    "avatar_url": null,
    "twitter_url": null,
    "linkedin_url": null,
    "blogs": [
      {
        "id": 2,
        "title": "Marketing Trends 2026 - Part 2",
        "slug": "marketing-trends-2026-part-2",
        "excerpt": null,
        "published_at": "2026-04-29 00:00:00",
        "thumbnail_url": null
      }
    ]
  }
}
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

_Cause: Missing or invalid API key_

### 422 Validation Error

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "title": ["The title field is required."],
    "slug": ["The slug has already been taken."]
  }
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Failed to create blog: error details here"
}
```

---

## Status Codes

| Value | Meaning   |
| ----- | --------- |
| 0     | Draft     |
| 1     | Published |

---

## Notes

1. **Slug auto-generation**: If slug is empty but title is provided, slug will be auto-generated from title.
2. **Thumbnail handling**: When updating a blog with a new thumbnail, the old thumbnail is automatically deleted from S3.
3. **Tags format**: Send as array `tags[]=tag1&tags[]=tag2` in form-data, or `["tag1","tag2"]` in JSON.
4. **S3 Storage**: Uploaded thumbnails are stored in `Blogs/{randomString}_{date}_{filename}` format.
5. **BlogStatus Enum**: Use `App\Enums\BlogStatus` - DRAFT=0, PUBLISHED=1.

---

## Configuration

Set your API key in `.env` file:

```env
API_KEY=your_api_key
```

Regenerate config cache after changing:

```bash
docker exec app php artisan config:clear
```
