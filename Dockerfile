# Base image with Node.js and pnpm
FROM node:20-alpine AS base
WORKDIR /app

# Install compatibility tools (if needed)
RUN apk add --no-cache gcompat

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app ./
ARG NEXT_PUBLIC_API
ARG DATABASE_URL
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Add unprivileged user for security
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -s /bin/sh -D nextjs

# Copy required files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0
ENV PORT 4000
EXPOSE 4000

CMD ["node", "server.js"]
