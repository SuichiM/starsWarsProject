FROM node:lts-slim

WORKDIR '/home/app'

# CMD npm run $COMMAND
ENTRYPOINT ["tail", "-f", "/dev/null"]