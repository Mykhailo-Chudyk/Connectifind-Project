from django.db import models
import uuid 
from users.models import User
from categories.models import Category

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    authorId = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Author")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)  
    location = models.CharField(max_length=255)
    time = models.DateTimeField()
    capacity = models.IntegerField(null=True, blank=True) 
    visibility = models.CharField(max_length=7, choices=[('public', 'Public'), ('private', 'Private')])
    code = models.CharField(max_length=6, null=True, blank=True) 
    categories = models.ManyToManyField(Category, blank=True)
    participants = models.ManyToManyField(User, related_name='joined_events', blank=True)
    image = models.TextField(null=True, blank=True)
    duration = models.IntegerField(default=120)

    def __str__(self):
        return f"{self.title} - {self.location} on {self.time}"
    