from django.db import models

# Create your models here.
class Foo(models.Model):
    foo_id = models.AutoField(primary_key = True)
    description = models.TextField()