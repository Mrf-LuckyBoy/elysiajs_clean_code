##FROM node:14.15.4-alpine3.12
FROM oven/bun:1.1.42-alpine AS base

WORKDIR '/app'

COPY package.json .

RUN bun install 

COPY . .
EXPOSE 3000
CMD ["bun","dev"]
