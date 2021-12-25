FROM ubuntu:21.10


# Common Dependencies & DevTools
RUN ulimit -n 8192 \
  && (bash -c 'if [[ -v HTTP_PROXY ]] ; then (echo Acquire::http::Proxy \"$HTTP_PROXY\"\; >/etc/apt/apt.conf) ; fi') \
  && apt-get update \
  && apt-get install -yqq --no-install-recommends software-properties-common curl \
  && apt-add-repository multiverse \
  && apt-get update \
  && apt-get -yqq install \
  apt-transport-https \
  build-essential \
  ca-certificates \
  git \
  git-lfs \
  p7zip-full \
  unzip \
  wget \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


# Install Docker CE CLI
RUN apt-get update \
  && apt-get install -y apt-transport-https ca-certificates curl gnupg2 lsb-release \
  && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null \
  && echo "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y docker-ce-cli \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Github CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list \
  && apt update \
  && apt install gh \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Deno - Install Deno
RUN mkdir /root/.deno
COPY --from=denoland/deno:bin /deno /usr/local/bin/deno

# Starship prompt
RUN bash -c "$(curl -fsSL https://starship.rs/install.sh)" -- --yes \
  && echo "eval \"\$(starship init bash)\"" | tee -a /root/.bashrc \
  && mkdir -p /root/.config
COPY content/starship.toml /root/.config/starship.toml


# Add shared scripts and local scripts to path
ENV PATH=/workspace/lang/deno/deno-01/scripts:/workspace/scripts:$PATH

CMD [ "tail", "-f" "anything" ]