# Sam McAnelly's Personal Website

[![Version](https://img.shields.io/github/package-json/v/sam-f-mcanelly/personal-website)](https://github.com/sam-f-mcanelly/personal-website)
[![Last Commit](https://img.shields.io/github/last-commit/sam-f-mcanelly/personal-website)](https://github.com/sam-f-mcanelly/personal-website/commits/main)
[![License](https://img.shields.io/badge/license-proprietary-lightgrey)](LICENSE)

My personal website: a resume timeline, side projects, and a look at my interests (photos, books,
podcasts, and videos).

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript.

## Quick Start

Requires Node.js 20.9 or newer (CI and the Docker image use Node 22).

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3064.

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start the development server on port 3064        |
| `npm run build`    | Create a production build (standalone output)    |
| `npm run start`    | Serve the production build on port 3064          |
| `npm run lint`     | Run ESLint                                       |
| `npm run lint:fix` | Run ESLint and fix what it can                   |
| `npm run format`   | Format the codebase with Prettier                |

## Project Structure

```
app/
  components/
    header.tsx           Name, photo, and social links
    resume/              Experience timeline, education, skills, and projects
    personal/            Photo gallery, books, podcasts, and videos
  common/                Shared data (skill tag colors)
  terms/                 Terms of service page
  globals.css            Tailwind setup and theme variables
components/              Shared UI components and the animated background
contexts/                React context for the image popup
public/images/           Images, grouped by section
```

## Updating Content

Most content lives as data at the top of its component:

- **Experience:** `app/components/resume/timeline/jobs.tsx`
- **Education:** `app/components/resume/timeline/education.tsx`
- **Skills:** `app/components/resume/timeline/skills.tsx`
- **Projects:** `app/components/resume/projects/projects.tsx`
- **Interests and gallery:** `app/components/personal/`

Images go in the matching folder under `public/images/` and are referenced by path, e.g.
`/images/resume/netflix.png`.

## Deployment

On every push to `main`, the Gitea Actions workflow (`.gitea/workflows/release.yml`) installs
dependencies and runs a production build to confirm the site still compiles.

The app builds as a [standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
Next.js server and ships with a multi-stage `Dockerfile`:

```bash
docker build -t personal-website .
docker run -p 3000:3000 personal-website
```

The container serves the site on port 3000.

## License

Copyright © 2025-2026 Sam McAnelly. All rights reserved. This code and its content are proprietary;
see [LICENSE](LICENSE) for details.
