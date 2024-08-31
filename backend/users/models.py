from django.db import models
import uuid

class User(models.Model):
    userId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    description = models.TextField(blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.firstName} {self.lastName}"