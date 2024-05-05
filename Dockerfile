# Base image
FROM node:22-bookworm-slim as base

# Set the working directory inside the container
WORKDIR /app

# install dependencies packages
RUN apt-get update -y && apt-get install -y openssl

FROM base as development

# Copy the rest of the application code to the working directory
# Skip othe using .dockerignore
COPY . .

# Install dependencies using Yarn
RUN yarn install

# Run code style check
RUN yarn lint

# Run unit tests
RUN yarn test

# Run the build process
RUN yarn build

# Install production dependencies using Yarn
RUN yarn install --production

FROM base as production

# Copy built files and necessary dependencies from the development stage
COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules ./node_modules

# Expose the port your application runs on (if applicable)
EXPOSE 3000

# Start the Nest.js application
CMD ["node", "dist/main"]