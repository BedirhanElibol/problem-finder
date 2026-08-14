# 🐳 KinderLog & CareLog Production Dockerfile
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY src ./src
COPY supabase ./supabase
COPY public ./public 2>/dev/null || true

EXPOSE 3030

ENV NODE_ENV=production
ENV PORT=3030

CMD ["node", "src/index.js"]
