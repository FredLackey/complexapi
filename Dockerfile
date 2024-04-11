FROM node:18.19-slim
LABEL maintainer  = "Fred Lackey <fred.lackey@gmail.com>"
LABEL build-date  = "2023-03-30T00:15:33-07:00"
LABEL name        = "complexapi"
LABEL version     = "0.0.2"
LABEL description = "Placeholder API used in POCs and sandbox applications."
LABEL url         = "https://github.com/FredLackey/complexapi"

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app

RUN npm ci --only=production

USER node

EXPOSE 3000

CMD [ "dumb-init", "node", "./src/index.js" ]

