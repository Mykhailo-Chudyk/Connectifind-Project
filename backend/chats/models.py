from django.db import models
import uuid
from users.models import User
from events.models import Event

class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='chats')
    participants = models.ManyToManyField(User, related_name='chats')

    def __str__(self):
        participants_str = ", ".join([user.username for user in self.participants.all()])
        return f"Chat in {self.event.title} between {participants_str}"