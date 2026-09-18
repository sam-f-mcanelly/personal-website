---
title: Hello, World
date: 2026-09-18
summary: A first post to kick off the blog.
draft: true
---

This is a starter post. Replace it with your own writing, or delete this file.

## Writing a post

Add a Markdown file to `content/blog/`. The file name becomes the URL, so `my-post.md` is served at
`/blog/my-post`. Each post starts with a frontmatter block:

```md
---
title: My Post
date: 2026-09-18
summary: One line shown in the post list.
draft: false
---
```

Posts marked `draft: true` show up while running `npm run dev` but are left out of production
builds.
