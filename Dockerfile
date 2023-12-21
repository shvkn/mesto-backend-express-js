FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS proddeps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

RUN mkdir logs
RUN chown nodejs:nodejs logs

USER nodejs

COPY --from=builder --chown=nodejs:nodejs /app/dist ./
COPY --from=proddeps --chown=nodejs:nodejs /app/node_modules ./node_modules

#RUN npm install -g pm2

ENV PORT 3000
EXPOSE 3000

#CMD ["pm2-runtime", "app.js", "--update-env"]
CMD ["node", "app.js"]
