FROM node:14

RUN apt-get update -y \
    && apt-get install -y nginx

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG HOST=0.0.0.0
ARG PORT=5000
ARG PGPORT=5432
ARG PGPASSWORD=root
ARG PGUSER=postgres
ARG PGHOST=localhost
ARG PGDATABASE=forumapi
ARG ACCESS_TOKEN_KEY=dummy
ARG REFRESH_TOKEN_KEY=dummy
ARG ACCCESS_TOKEN_AGE=3000

ENV HOST=$HOST
ENV PORT=$PORT
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
COPY nginx/default.conf /etc/nginx/sites-enabled/default
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh && \
    ln -s usr/local/bin/docker-entrypoint.sh /

EXPOSE 80 443 5000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD [ "npm", "start" ]
