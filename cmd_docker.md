เปิด docker 
docker --version

ติดตั้ง Postgres
docker image ls
docker run --rm --name pegasus -e POSTGRES_PASSWORD=it8501dev2021 -d -p 5432:5432 -v pgvolume:/var/lib/postgresql/data postgres
docker container ls

ติดตั้ง pgadmin4
docker pull dpage/pgadmin4
docker run --name pg4 -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=it8501dev2021' -d dpage/pgadmin4