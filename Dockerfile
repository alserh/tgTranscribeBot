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
FROM ubuntu:22.04
WORKDIR /app
COPY --from=downloader /model ./res/vosk-model-small-ru-0.22
COPY . .
# Add other commands as needed