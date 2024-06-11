FROM node:lts as dependencies
WORKDIR /grubstack-web-v2
COPY package.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /grubstack-web-v2
COPY . .
COPY --from=dependencies /grubstack-web-v2/node_modules ./node_modules
ENV NODE_ENV production
ARG ACCESS_TOKEN
ENV ACCESS_TOKEN=${ACCESS_TOKEN}
ARG API_URL
ENV API_URL=${API_URL}
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
ARG TENANT_ID
ENV TENANT_ID=${TENANT_ID}
RUN npm run build

FROM node:lts as runner
WORKDIR /grubstack-web-v2
ENV NODE_ENV production

COPY --from=builder /grubstack-web-v2/next.config.mjs ./
COPY --from=builder /grubstack-web-v2/public ./public
COPY --from=builder /grubstack-web-v2/.next ./.next
COPY --from=builder /grubstack-web-v2/node_modules ./node_modules
COPY --from=builder /grubstack-web-v2/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]