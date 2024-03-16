# Stage 1: Build frontend assets
FROM node:latest AS frontend

WORKDIR /frontend

# Copy package.json and package-lock.json separately to leverage Docker's caching mechanism
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY public ./public
COPY src ./src

# Build the frontend
RUN npm run build


# Stage 2: Serve frontend assets with nginx
FROM nginx:latest AS server

# Copy built assets from the previous stage into nginx's html directory
COPY --from=frontend /frontend/build/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
