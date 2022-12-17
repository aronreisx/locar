ENV__FILEPATH=.env.$(ENV)

include $(ENV_FILE_PATH)

COMPOSE_BASE_COMMAND=docker-compose --env-file $(ENV_FILE_PATH)
DOTENV_COMMAND=node node_modules/.bin/dotenv -e $(ENV_FILE_PATH)

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

.PHONY: database-bash
database-bash:
	docker exec -it $(DB_CONTAINER_NAME) bash

.PHONY: remove-database
remove-database:
	docker rm -fv $(DB_CONTAINER_NAME)

.PHONY: remove-modules
remove-modules:
	rm -rf node_modules

.PHONY: prisma-reset
prisma-reset:
	$(DOTENV_COMMAND) -- npx prisma migrate reset  --force --skip-seed

.PHONY: prisma-migrate
prisma-migrate:
	$(DOTENV_COMMAND) -- yarn prisma migrate deploy

.PHONY: prisma-migrate-dev
prisma-migrate-dev:
	$(DOTENV_COMMAND) -- yarn prisma migrate dev

.PHONY: run-app-test
run-app-test:
	$(DOTENV_COMMAND) -- jest

.PHONY: db-seed-all
db-seed-all:
	$(DOTENV_COMMAND) -- ts-node-dev -r tsconfig-paths/register \
	prisma/seed/index.ts

.PHONY: db-seed-users
db-seed-users:
	$(DOTENV_COMMAND) -- ts-node-dev -r tsconfig-paths/register \
	prisma/seed/users/index.ts

.PHONY: app-serve-ts
app-serve-ts:
	$(DOTENV_COMMAND) -- ts-node-dev -r tsconfig-paths/register \
	--inspect --transpile-only --ignore-watch node_modules --respawn \
	src/shared/infra/http/server.ts

.PHONY: app-serve-js
app-serve-js:
	$(DOTENV_COMMAND) -- node dist/shared/infra/http/server.js

.PHONY: build
build:
	node_modules/.bin/babel src --extensions \".ts\" --out-dir dist --copy-files

.PHONY: lint
lint:
	node_modules/.bin/eslint . --ext .ts

.PHONY: lint-fix
lint-fix:
	eslint . --ext .ts --fix

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
