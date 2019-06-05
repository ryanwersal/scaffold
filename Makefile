dev-up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

dev-down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

prod-up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

prod-down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

# Some convenience functions for working with Django. If you need user input
# then you'll probably have to run manage.py manually.
migrations:
	docker exec scaffold_backend_1 python manage.py makemigrations

migrate-db:
	docker exec scaffold_backend_1 python manage.py migrate

new-backend-app:
	docker exec scaffold_backend_1 python manage.py startapp $(name)