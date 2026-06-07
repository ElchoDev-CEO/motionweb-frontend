FROM node:24-slim AS base
WORKDIR /home/app
RUN npm i -g bun

FROM base AS builder
COPY package.json ./
RUN bun install --ignore-scripts
COPY . .
RUN bun run build

FROM node:24-slim AS runtime
WORKDIR /home/app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /home/app/.next/standalone ./
COPY --from=builder /home/app/.next/static    ./.next/static
COPY --from=builder /home/app/public          ./public

EXPOSE ${PORT}
CMD ["node", "server.js"]
