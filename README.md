# Sam McAnelly's Portfolio Website

[![Version](https://img.shields.io/github/package-json/v/sam-mcanelly/personal-website)](https://github.com/sam-mcanelly/personal-website)
[![Build Status](https://img.shields.io/github/actions/workflow/status/sam-mcanelly/personal-website/release.yml)](https://github.com/sam-mcanelly/personal-website/actions)
[![License](https://img.shields.io/github/license/sam-mcanelly/personal-website)](https://github.com/sam-mcanelly/personal-website/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/sam-mcanelly/personal-website)](https://github.com/sam-mcanelly/personal-website/commits/main)

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS.

## 🚀 Quick Start

1. Clone this repository
2. Install dependencies with \`npm install\`
3. Run the development server with \`npm run dev\`

## Self-hosting Images

To use your own images in the portfolio:

1. Place your images in the \`public/images\` folder.
2. Reference your images in the code using the path \`/images/your-image-name.jpg\`.

### Using Self-hosted Images in Placeholders

To use your self-hosted images in place of the placeholder.svg:

1. In components that use Image or img tags, replace the src attribute:

   From:

```jsx

   src="/placeholder.svg?height=400&width=600"

```

   To:

```jsx

   src="/images/your-image-name.jpg"

```

2. Make sure to provide appropriate alt text for accessibility.
3. Adjust the width and height props of the Image component if necessary to match your image dimensions.

Example:

```jsx

<Image

src="/images/project-thumbnail.jpg"

alt="Project Thumbnail"

width={600}

height={400}

className="object-cover rounded-lg"

/>

```

Remember to optimize your images for web use to ensure fast loading times.

## Customizing Content

To customize the content of your portfolio:

1. Edit the components in the \`app/components\` directory.
2. Update the data in each component to reflect your personal information, projects, and experiences.
3. Modify the styling in the component files or in \`app/globals.css\` to match your preferred design.

## 🚀 Deployment

This project uses a fully automated deployment pipeline with Gitea Actions, Docker, and Watchtower.

### CI/CD Pipeline

The deployment process is automated through `.gitea/workflows/release.yml`:

```yaml
name: Build and Release
run-name: ${{ gitea.actor }} has triggered Build and Release 🚀
on: [push]

# ... (rest of the workflow file)
```

The workflow:
1. Builds the Next.js application
2. Creates a Docker image
3. Pushes the image to a private registry running on the server in a docker container

### Automatic Updates

The production environment uses Docker Compose with Watchtower for automatic updates:

```yaml
services:
  personal-website:
    image: registry:5000/sam/personal-website:latest
    container_name: personal-website
    restart: unless-stopped
    ports:
      - "3000:3000"
    labels:
      - "com.centurylinklabs.watchtower.enable=true"

  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_LABEL_ENABLE=true
      - WATCHTOWER_POLL_INTERVAL=30
```

When changes are pushed to the main branch:
1. Gitea Actions builds and pushes a new Docker image
2. Watchtower detects the new image
3. The website container is automatically updated
4. Zero-downtime deployment ensures smooth updates

### Manual Deployment

For manual builds and deployment:

```bash
# Build the project
npm run build

# Build Docker image
docker buildx build -t personal-website:latest .

# Run the container
docker run -p 3000:3000 personal-website:latest
```

The static output will be in the 'out' directory for direct hosting if needed.
