# ==========================================
# STAGE 1: Build the React Frontend
# ==========================================
FROM node:22-alpine AS frontend-builder
WORKDIR /app/client

# Copy client package files and install dependencies
COPY client/package*.json ./
# FIX: Added --foreground-scripts to prevent the ETXTBSY esbuild error
RUN npm install --foreground-scripts

# Copy the rest of the client source and build it
COPY client/ ./
RUN npm run build


# ==========================================
# STAGE 2: Build the TypeScript Backend
# ==========================================
FROM node:22-alpine AS backend-builder
WORKDIR /app/server

# Copy server package files and install dependencies
COPY server/package*.json ./
# FIX: Added --foreground-scripts
RUN npm install --foreground-scripts

# Copy the server source code and compile TypeScript to the /dist folder
COPY server/ ./
RUN npm run build


# ==========================================
# STAGE 3: Final Production Image
# ==========================================
FROM node:22-alpine
WORKDIR /app/server

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=10000

# Install ONLY production dependencies for a smaller image size
COPY server/package*.json ./
# FIX: Added --foreground-scripts
RUN npm install --production --foreground-scripts

# Copy compiled backend code from Stage 2
COPY --from=backend-builder /app/server/dist ./dist

# Copy compiled frontend code from Stage 1
COPY --from=frontend-builder /app/client/dist /app/client/dist

# Expose the port the app runs on
EXPOSE 10000

# Start the Node.js server
CMD ["npm", "start"]