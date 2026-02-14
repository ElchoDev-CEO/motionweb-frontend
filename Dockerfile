FROM node:24-slim

WORKDIR /home/app

COPY package.json ./

RUN npm i -g bun
RUN bun i --ignore-scripts

COPY . .

ENV PORT=3000
EXPOSE ${PORT}

CMD ["sh", "-c", "bun run build && bun run start"]
