

run-with-docker:
	docker-compose down -v
	docker-compose up --build --remove-orphans
