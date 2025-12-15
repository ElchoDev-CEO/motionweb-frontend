FROM node:24-slim

WORKDIR /home/app

COPY . .

RUN npm i -g bun
RUN bun i --ignore-scripts

ENV PORT=3000
EXPOSE ${PORT}

CMD ["sh", "-c", "bun run build && bun run start"]
