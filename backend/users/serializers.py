from rest_framework import serializers
from .models import User
from event_participants.models import EventParticipant

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    
    Provides serialization for user profile data with an additional dynamic 'goal' field
    that is retrieved based on the event context.
    """
    goal = serializers.SerializerMethodField()

    class Meta:
        """
        Meta class for UserSerializer configuration.
        
        Specifies the model to serialize and the fields to include in the serialized output.
        """
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'description', 'avatar', 'goal', 'university', 'hometown', 'workplace']

    def get_goal(self, obj):
        """
        Retrieve the user's goal for a specific event.
        
        This method fetches the user's goal from the EventParticipant model
        based on the event ID provided in the serializer context.
        
        Args:
            obj: The User instance being serialized
            
        Returns:
            str or None: The user's goal for the specified event, or None if not found
                         or if event_id is not provided in the context
        """
        request = self.context.get('request')
        event_id = self.context.get('event_id')
        if not request or not event_id:
            return None

        try:
            participant = EventParticipant.objects.get(eventId=event_id, userId=obj)
            return participant.goal
        except EventParticipant.DoesNotExist:
            return None