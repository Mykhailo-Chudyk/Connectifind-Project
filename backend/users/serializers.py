from rest_framework import serializers
from .models import User
from event_participants.models import EventParticipant

class UserSerializer(serializers.ModelSerializer):
    goal = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'description', 'avatar', 'goal']

    def get_goal(self, obj):
        request = self.context.get('request')
        event_id = self.context.get('event_id')
        if not request or not event_id:
            return None

        try:
            participant = EventParticipant.objects.get(eventId=event_id, userId=obj)
            return participant.goal
        except EventParticipant.DoesNotExist:
            return None