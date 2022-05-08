FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG PGPORT=5432
ARG PGPASSWORD=root
ARG PGUSER=postgres
ARG PGHOST=localhost
ARG PGDATABASE=forumapi
ARG ACCESS_TOKEN_KEY=dummy
ARG REFRESH_TOKEN_KEY=dummy
ARG ACCCESS_TOKEN_AGE=3000

ENV PGPORT=$PGPORT
ENV PGPASSWORD=$PGPASSWORD
ENV PGUSER=$PGUSER
ENV PGHOST=$PGHOST
ENV PGDATABASE=$PGDATABASE
ENV ACCESS_TOKEN_KEY=$ACCESS_TOKEN_KEY
ENV REFRESH_TOKEN_KEY=$REFRESH_TOKEN_KEY
ENV ACCCESS_TOKEN_AGE=$ACCCESS_TOKEN_AGE

RUN touch .env
RUN printenv > .env

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh && \
    ln -s usr/local/bin/docker-entrypoint.sh /

ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 5000
CMD [ "npm", "start" ]
