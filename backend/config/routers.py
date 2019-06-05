from rest_framework import routers
from api.views import FooViewSet

router = routers.DefaultRouter()

router.register(r'foo', FooViewSet)
