FROM postgres:17.1
EXPOSE 5432
COPY init.sql /docker-entrypoint-initdb.d/
COPY seed.sql /docker-entrypoint-initdb.d/