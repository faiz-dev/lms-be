# ---------------------------------------
# STAGE 1: BUILDER & COMPILER
# ---------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# 👇 INI JUARA KITA: Install alat kompilasi (Python, Make, G++)
# Tanpa ini, instalasi bcrypt di Alpine bakal GAGAL.
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install semua deps (termasuk dev) & compile bcrypt
RUN npm ci

COPY . .

# Build NestJS (TypeScript -> JS)
RUN npm run build

# 🔥 TRICK PENTING:
# Kita install ulang hanya dependencies production DI SINI (di stage builder),
# mumpung masih ada Python/Make/G++.
# Kalau kita lakukan di stage runner nanti, bakal error lagi.
RUN npm ci --only=production && npm cache clean --force

# ---------------------------------------
# STAGE 2: RUNNER (Production Ready)
# ---------------------------------------
FROM node:20-alpine

ENV NODE_ENV="production"
WORKDIR /app

COPY package*.json ./

# 👇 COPY node_modules DARI BUILDER
# Kita copy folder node_modules yang sudah ada bcrypt terkompilasi di dalamnya
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node

CMD ["node", "dist/main"]