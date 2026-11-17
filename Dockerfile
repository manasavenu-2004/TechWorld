
# Stage 1: Base image
FROM nginx:stable-alpine AS base

# Maintainer label
LABEL maintainer="TechWorld Team"

# Website description
LABEL description="TechWorld IT Services Website served via Nginx"

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the entire project into the Nginx web root
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
