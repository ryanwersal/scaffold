from rest_framework import routers
from apps.example.views import ExampleViewSet

api = routers.DefaultRouter()
api.trailing_slash = '/?'

api.register(r'example', ExampleViewSet)
