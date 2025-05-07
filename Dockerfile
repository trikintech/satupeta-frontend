# Base Image with Bun
FROM oven/bun:1.1.10-alpine AS base
WORKDIR /app

# Add compatibility tools if needed
RUN apk add --no-cache libc6-compat

# Install dependencies using Bun
FROM base AS deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

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
RUN bun run build

# Production image
FROM oven/bun:1.1.10-alpine AS runner
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

CMD ["bun", "server.js"]
