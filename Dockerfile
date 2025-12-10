FROM oven/bun:1 AS deps
WORKDIR /usr/src/app

COPY package.json bun.lock ./ 
RUN bun install --frozen-lockfile


FROM node:22.9.0-alpine AS build
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:22.9.0-alpine AS release
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/.next/standalone ./
COPY --from=build /usr/src/app/.next/static ./.next/static
COPY --from=build /usr/src/app/public ./public

EXPOSE 14701
CMD ["node", "server.js"]
