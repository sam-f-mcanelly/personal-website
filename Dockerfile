# Use Node.js 18 Alpine as the base image for a smaller footprint
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies required for node-gyp on Alpine
RUN apk add --no-cache python3 make g++

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
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3064

# Set host to allow connections from outside the container
ENV HOSTNAME "0.0.0.0"

# Start the application using next start
CMD ["npm", "start"]