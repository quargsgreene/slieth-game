FROM node:23-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /slieth-game

COPY package.json yarn-lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
	if [ -f yarn.lock ]; then yarn; \
	elif [ -f package-lock.json ]; then npm ci; \
	elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i;\
	else echo "Lockfile not found." && exit 1; \
	fi

FROM base AS builder
WORKDIR /slieth-game
COPY --from=deps /slieth-game/node_modules ./node_modules
COPY . .

ENV NEXT_PRIVATE_STANDALONE=true
RUN \
	if [ -f yarn.lock ]; then yarn run build; \
	elif [ -f package-lock.json ]; then npm run build; \
	elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
	else echo "Lockfile not found." && exit 1; \
	fi

FROM base AS runnner
WORKDIR /slieth-game

ENV NODE_ENV=production
ENV NEXT_PRIVATE_STANDALONE=true

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /slieth-game/public ./public
COPY --from=builder --chown=nextjs:nodejs /slieth-game/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /slieth-game/.next/static ./next/static
RUN chmod -R a-w+x . && chmod -R a+x .next node_modules

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
