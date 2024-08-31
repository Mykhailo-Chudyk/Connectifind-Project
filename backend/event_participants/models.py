from django.db import models
import uuid
from users.models import User
from events.models import Event

class EventParticipant(models.Model):
    eventParticipantId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User")
    eventId = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="Event")
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    goal = models.TextField(blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.firstName} {self.lastName} - {self.eventId}"