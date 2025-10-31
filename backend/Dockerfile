# Build stage
FROM node:18-bullseye-slim AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for building (optional, for Puppeteer or other native modules)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Copy configuration files needed for build
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci && npm cache clean --force

# Copy source code
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:18-bullseye-slim AS production

# Install necessary system dependencies for running Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libx11-6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libgbm1 \
    libpangocairo-1.0-0 \
    libxss1 \
    procps \
    wget \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Ensure there is a canonical /usr/bin/chromium and export path
RUN if [ -x /usr/bin/chromium ]; then \
    echo "/usr/bin/chromium exists"; \
    elif [ -x /usr/bin/chromium-browser ]; then \
    ln -sf /usr/bin/chromium-browser /usr/bin/chromium; \
    elif command -v chromium >/dev/null 2>&1; then \
    ln -sf "$(command -v chromium)" /usr/bin/chromium; \
    else \
    echo "Warning: chromium binary not found"; \
    fi

# Create app directory
WORKDIR /app

# Create non-root user
RUN groupadd -r -g 1001 nodejs || (echo "groupadd failed" && exit 1) \
    && useradd -r -u 1001 -g nodejs -m -d /home/nestjs -s /bin/bash nestjs || (echo "useradd failed" && exit 1)

# Copy package files
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy templates directory if it exists
COPY templates ./templates

# Change ownership to non-root user
RUN chown -R 1001:1001 /app
USER nestjs

# Expose port
EXPOSE 8000

# Set environment variables for Puppeteer
ENV CHROMIUM_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Start the application
CMD ["node", "dist/main.js"]
