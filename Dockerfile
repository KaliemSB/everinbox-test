FROM oven/bun:alpine AS base
WORKDIR /usr/src/app
COPY . .

FROM base AS install-dev
RUN bun install --frozen-lockfile

FROM base AS install
RUN bun install --frozen-lockfile --production

FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
RUN bun run build

FROM base AS release
COPY --from=build /usr/src/app/dist ./dist

USER bun
EXPOSE ${PORT}
ENV NODE_ENV=production
ENTRYPOINT ["bun", "/usr/src/app/dist/main.js"]