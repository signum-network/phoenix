FROM electronuserland/builder:wine

WORKDIR /app

COPY . /app

RUN wine --version && \
npm i -g @angular/cli

CMD ./scripts/ci/docker-desktop.sh
