from django.db import models
import uuid
from users.models import User
from events.models import Event

class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    authorId1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_user1')
    authorId2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_user2')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='chats', null=False)

    def __str__(self):
        return f"Chat between {self.authorId1} and {self.authorId2} for Event {self.event.title}"