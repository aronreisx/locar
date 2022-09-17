ENV_PATH=.env.$(ENV)

include $(ENV_PATH)

COMPOSE_BASE_COMMAND=docker-compose --env-file $(ENV_PATH)
DOTENV_COMMAND=dotenv -e .env.$(ENV)

.PHONY: up
up:
	$(COMPOSE_BASE_COMMAND) up -d

.PHONY: down
down:
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

.PHONY: run-app-test
run-app-test:
	npx dotenv -e .env.$(ENV) -- jest

.PHONY: db-seed
db-seed:
	npx dotenv -e .env.$(ENV) -- ts-node-dev -r tsconfig-paths/register \
	prisma/seed/index.ts

.PHONY: app-serve
app-serve:
	npx dotenv -e .env.$(ENV) -- ts-node-dev -r tsconfig-paths/register \
	--inspect --transpile-only --ignore-watch node_modules --respawn \
	src/shared/infra/http/server.ts

.PHONY: run-test-workflow
run-test-workflow:
	yarn make:test run-database && \
	yarn make:test prisma-migrate && \
	yarn make:test run-app-test; \
	yarn make:test remove-database
