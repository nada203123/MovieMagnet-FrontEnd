# Stage 1: Build the Angular application
FROM node:18-alpine AS build

WORKDIR /app

RUN npm install -g @angular/cli
# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the Angular app
COPY . .
RUN ng build --configuration production

# Stage 2: Serve Angular application using Nginx
FROM nginx:alpine

# Copy the built Angular files to Nginx
COPY --from=build /app/dist/Movies /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
