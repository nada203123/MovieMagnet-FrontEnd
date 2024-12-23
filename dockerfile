# Stage 1: Build the Angular application
FROM node:14 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build the Angular app
COPY . .
RUN npm run build --prod

# Stage 2: Serve Angular application using Nginx
FROM nginx:alpine

# Copy the built Angular files to Nginx
COPY --from=build /app/dist/Movies /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
