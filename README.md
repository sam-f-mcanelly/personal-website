
# Sam McAnelly's Portfolio Website

This is a portfolio website built with Next.js, React, and Tailwind CSS.

## Getting Started

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

\`\`\`jsx

   src="/placeholder.svg?height=400&width=600"

\`\`\`

   To:

\`\`\`jsx

   src="/images/your-image-name.jpg"

\`\`\`

2. Make sure to provide appropriate alt text for accessibility.
3. Adjust the width and height props of the Image component if necessary to match your image dimensions.

Example:

\`\`\`jsx

<Image

src="/images/project-thumbnail.jpg"

alt="Project Thumbnail"

width={600}

height={400}

className="object-cover rounded-lg"

/>

\`\`\`

Remember to optimize your images for web use to ensure fast loading times.

## Customizing Content

To customize the content of your portfolio:

1. Edit the components in the \`app/components\` directory.
2. Update the data in each component to reflect your personal information, projects, and experiences.
3. Modify the styling in the component files or in \`app/globals.css\` to match your preferred design.

## Deployment

This project is set up to be easily deployed on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

For other hosting options, build the project with \`npm run build\` and deploy the \`out\` directory to your preferred static hosting service.
