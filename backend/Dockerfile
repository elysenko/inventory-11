FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# The generated client (node_modules/.prisma) and the query engine are produced
# here and carried into the runtime stage with node_modules below.
RUN npx prisma generate
# nest build can exit 0 while emitting nothing (a stale tsbuildinfo, or a rootDir
# that pushes output to dist/src/). Assert the entrypoint the CMD actually runs,
# so a bad build fails here instead of crash-looping the pod.
RUN npm run build \
    && test -f dist/main.js \
    || (echo 'ERROR: dist/main.js missing after build — check tsconfig.build.json rootDir: src' && exit 1)

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
# node_modules carries the generated Prisma client and the prisma CLI the
# platform's migrate/seed step invokes; prisma/ carries schema, migrations and
# prisma/seed/seed.js. Removing either breaks the post-deploy seed Job.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
EXPOSE 3001
CMD ["node", "dist/main"]
