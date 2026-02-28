FROM node:20-alpine AS builder

WORKDIR /app

ARG OPENWEATHER_API_KEY
ENV OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY

EXPOSE 3000

CMD ["npm", "start"]
