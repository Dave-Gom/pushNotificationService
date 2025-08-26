FROM node:19-alpine3.16

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .

EXPOSE 3000

# ENTRYPOINT [ "sh","docker/entrypoint.sh" ]

RUN yarn install

CMD [ "yarn", "dev" ]


