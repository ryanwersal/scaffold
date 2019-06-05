from rest_framework import viewsets
from .models import Foo
from .serializers import FooSerializer

class FooViewSet(viewsets.ModelViewSet):
    queryset = Foo.objects.all()
    serializer_class = FooSerializer
