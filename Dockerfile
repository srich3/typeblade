# Multi-stage build for TypeBlade
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
COPY frontend/package.json frontend/package-lock.json* ./frontend/
COPY api/package.json api/package-lock.json* ./api/
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Build backend
FROM node:18 AS backend-build
WORKDIR /app/api
COPY api/package.json api/package-lock.json ./
RUN npm install
COPY api ./
RUN npm run build

# Final image
FROM node:18
WORKDIR /app
COPY --from=backend-build /app/api .
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# (Optional) If your API expects static files in a different location, adjust the COPY accordingly

ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/index.js"]

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built applications
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/api/dist ./api/dist
COPY --from=builder /app/api/package.json ./api/package.json

# Copy Supabase configuration
COPY --from=builder /app/supabase ./supabase

# Install only production dependencies for API
WORKDIR /app/api
RUN npm install --omit=dev && npm cache clean --force

# Create logs directory with proper permissions
RUN mkdir -p logs && chown nextjs:nodejs logs

# Create a non-root user
USER nextjs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Start the application
CMD ["npm", "start"] 