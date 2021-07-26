FROM cypress/base:12

WORKDIR '/home/app'

# CMD npm run $COMMAND
ENTRYPOINT ["tail", "-f", "/dev/null"]