# Stage 1: Download and extract the model
FROM ubuntu:22.04 as downloader
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*
RUN mkdir -p /model
RUN wget https://alphacephei.com/vosk/models/vosk-model-small-ru-0.22.zip -O /tmp/vosk-model-small-ru-0.22.zip && \
    unzip /tmp/vosk-model-small-ru-0.22.zip -d /model && \
    rm /tmp/vosk-model-small-ru-0.22.zip

# Stage 2: Final image
FROM node:18.17.1-alpine3.18
RUN apk update && \
    apk add --no-cache ffmpeg
WORKDIR /app

# Copy the downloaded model from the downloader stage
COPY --from=downloader /model ./res/vosk-model-small-ru-0.22

# Copy package.json and install dependencies
COPY package.json .
RUN npm cache clean --force
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3000

# Define the entry point
ENTRYPOINT [ "node", "index.js" ]