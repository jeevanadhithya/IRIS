# Multi-stage Dockerfile for GEOSENSE Frontend

# Stage 1: Build the Vite React TypeScript application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies (ignoring peer dependency mismatches if needed)
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the production static files with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
