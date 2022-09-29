ENV_PATH=.env.$(ENV)

include $(ENV_PATH)

COMPOSE_BASE_COMMAND=docker-compose --env-file $(ENV_PATH)
DOTENV_COMMAND=dotenv -e .env.$(ENV)

.PHONY: compose-up
compose-up:
	$(COMPOSE_BASE_COMMAND) up -d

.PHONY: compose-down
compose-down:
	$(COMPOSE_BASE_COMMAND) down

.PHONY: run-database
run-database:
	docker run -d \
	--name $(DB_CONTAINER_NAME) \
	-p $(DB_PORT):$(DB_PORT) \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-e POSTGRES_USER=$(DB_USER) \
	-e POSTGRES_PASSWORD=$(DB_PASS) \
	-e POSTGRES_DB=$(DB_NAME) \
	$(DB_TYPE):$(DB_VERSION)

.PHONY: start-database
start-database:
	docker start $(DB_CONTAINER_NAME)

.PHONY: stop-database
stop-database:
	docker stop $(DB_CONTAINER_NAME)

.PHONY: logs-database
logs-database:
	docker logs $(DB_CONTAINER_NAME)

.PHONY: restart-database
restart-database:
	docker restart $(DB_CONTAINER_NAME)

.PHONY: terminal-database
terminal-database:
	docker exec -it $(DB_CONTAINER_NAME) bash

.PHONY: remove-database
remove-database:
	docker rm -fv $(DB_CONTAINER_NAME)

.PHONY: remove-modules
remove-modules:
	rm -rf node_modules

.PHONY: prisma-reset
prisma-reset:
	npx dotenv -e .env.$(ENV) -- npx prisma migrate reset  --force --skip-seed

.PHONY: prisma-migrate
prisma-migrate:
	npx dotenv -e .env.$(ENV) -- yarn prisma migrate deploy

.PHONY: prisma-migrate-dev
prisma-migrate-dev:
	npx dotenv -e .env.$(ENV) -- yarn prisma migrate dev

.PHONY: run-app-test
run-app-test:
	npx dotenv -e .env.$(ENV) -- jest

.PHONY: db-seed-all
db-seed-all:
	npx dotenv -e .env.$(ENV) -- ts-node-dev -r tsconfig-paths/register \
	prisma/seed/index.ts

.PHONY: db-seed-users
db-seed-users:
	npx dotenv -e .env.$(ENV) -- ts-node-dev -r tsconfig-paths/register \
	prisma/seed/users/index.ts

.PHONY: app-serve
app-serve:
	npx dotenv -e .env.$(ENV) -- ts-node-dev -r tsconfig-paths/register \
	--inspect --transpile-only --ignore-watch node_modules --respawn \
	src/shared/infra/http/server.ts

.PHONY: run-test-workflow
run-test-workflow:
	yarn make:test run-database && \
	yarn make:test prisma-migrate && \
	yarn make:test db-seed-all && \
	yarn make:test run-app-test; \
	yarn make:test remove-database

.PHONY: serve-seed-dev
serve-seed-dev:
	yarn make:dev compose-up && \
	yarn make:dev prisma-migrate && \
	yarn make:dev db-seed-all && \
	yarn make:dev app-serve
