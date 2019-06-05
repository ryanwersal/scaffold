from rest_framework import routers
from apps.users.views import UserViewSet

api = routers.DefaultRouter()
api.trailing_slash = '/?'

api.register(r'users', UserViewSet)
