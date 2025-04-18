from django.db import models
import uuid
from users.models import User
from chats.models import Chat

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, verbose_name="Chat")
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Author")
    
    time = models.DateTimeField(auto_now_add=True) 
    content = models.TextField()

    def __str__(self):
        return f"Message by {self.author} in {self.chat}"