# You can find the new timestamped tags here: https://hub.docker.com/r/gitpod/workspace-full/tags
FROM gitpod/workspace-full-vnc:2022-08-13-08-17-48


# Install custom tools, runtime, etc.
RUN brew install gh git-secret tig
# RUN brew install --cask google-cloud-sdk


## these are required for cypress
ENV CYPRESS_CACHE_FOLDER=/workspace/.cypress-cache

# Install Cypress dependencies.
RUN sudo apt-get update \
  && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  && sudo rm -rf /var/lib/apt/lists/*
