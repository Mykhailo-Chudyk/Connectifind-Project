from django.db import models
import uuid
from users.models import User  
from events.models import Event  

class FeedPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    eventId = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="Event")
    authorId = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Author")
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Post by {self.authorId} for event {self.eventId}"