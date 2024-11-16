FROM postgres:latest
EXPOSE 5432
COPY init.sql /docker-entrypoint-initdb.d/
COPY seed.sql /docker-entrypoint-initdb.d/