ARG DATABASE_URL=file:./prisma/dev.db
ARG DATABASE_URL_DEV="file:./dev.db"

ARG CLERK_PUBLISHABLE_KEY=pk_test_dG9sZXJhbnQtcGlnZW9uLTIyLmNsZXJrLmFjY291bnRzLmRldiQ
ARG CLERK_SECRET_KEY=sk_test_RqjYARFWom6RjWE3LBgoKxyYcGSM3Ek1i58CICWdwh
ARG CLERK_WEBHOOK_SIGNING_SECRET=whsec_pdFuSJBpn6LdzLaEQ84YrmqY6Uqu0U76
ARG API_SECRET=hrnS7hWwBbMmAsKrprUqZI_NI9g 


ARG IMAGEKIT_PUBLIC_KEY=public_CJu0Bj46gZdYgRyxL5DfkqwOLh0=
ARG IMAGEKIT_PRIVATE_KEY=private_9vWK6/qrbm6ghr/qOFbB3CxRyyg=
ARG IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/zveofxu98

FROM node:20-alpine3.19 AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL_DEV=${DATABASE_URL}
ENV IMAGEKIT_PUBLIC_KEY=${IMAGEKIT_PUBLIC_KEY}
ENV IMAGEKIT_PRIVATE_KEY=${IMAGEKIT_PRIVATE_KEY}

WORKDIR /app

COPY package*.json ./

# npm ci is preferred in CI/CD because it ensures deterministic installs and is faster than npm install
RUN npm ci

COPY . .
# generate prisma client (ensure prisma schema is under ./prisma)
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine3.19 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/generated ./build/generated

# copy prisma runtime artifacts generated in builder
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

EXPOSE 3000

CMD ["node", "build/src/server.js"]