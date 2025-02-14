# Use Node.js 18 Alpine as the base image for a smaller footprint
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with clean installation
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production image, copy all files and run next
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Copy built assets from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3064

# Set host to allow connections from outside the container
ENV HOSTNAME="0.0.0.0"

# Start the application using next start
CMD ["npm", "start"]