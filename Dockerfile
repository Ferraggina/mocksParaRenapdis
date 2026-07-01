# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Diagnóstico: verificar que src/ llegó al container
RUN echo "=== Contenido de /app ===" && ls -la /app && \
  echo "=== Contenido de /app/src ===" && ls -la /app/src/ || echo "❌ /app/src NO EXISTE"

RUN npm run build

# ── Stage 2: serve ──────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# OpenShift runs containers as arbitrary UID inside group 0 (root).
# All directories nginx needs must be writable by group root.
USER root 
RUN chown -R nginx:root \
  /var/cache/nginx \
  /var/run \
  /var/log/nginx \
  /usr/share/nginx/html && \
  chmod -R g+rwX \
  /var/cache/nginx \
  /var/run \
  /var/log/nginx \
  /usr/share/nginx/html && \
  # Nginx pid goes to /tmp so any UID can write it
  touch /tmp/nginx.pid && chmod g+w /tmp/nginx.pid

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

USER 1001
CMD ["nginx", "-g", "daemon off;"]
