from rest_framework import serializers
from .models import EventParticipant

class EventParticipantSerializer(serializers.ModelSerializer):
    """
    Serializer for the EventParticipant model.
    
    This serializer converts EventParticipant instances to and from JSON format,
    including all fields from the model for complete data representation.
    """
    class Meta:
        model = EventParticipant
        fields = '__all__'