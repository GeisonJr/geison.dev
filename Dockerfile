# Stage 1: Base
FROM node:22-alpine AS base
RUN corepack enable

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build args promoted to env so next.config.ts inlines them into the client bundle
ARG API_URL
ENV API_URL=$API_URL

COPY package.json        ./
COPY pnpm-lock.yaml      ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Stage 3: Release
FROM base AS release
WORKDIR /app

# Set the user to use when running this image
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs --ingroup nodejs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["node", "server.js"]
