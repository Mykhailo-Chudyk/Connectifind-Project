from django.db import models
import uuid
from users.models import User 

class Chat(models.Model):
    chatId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    authorId1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_user1')
    authorId2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_user2')

    def __str__(self):
        return f"{self.authorId1} and {self.authorId2}"