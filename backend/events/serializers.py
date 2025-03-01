from rest_framework import serializers
from .models import Event
from event_participants.models import EventParticipant
from users.serializers import UserSerializer
from categories.serializers import CategorySerializer
from categories.models import Category
from rest_framework.fields import SerializerMethodField
from event_participants.serializers import EventParticipantSerializer


class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Event model.
    
    Provides a complete representation of events including author information,
    participation status, category details, and participant information.
    
    Attributes:
        author: The user who created the event
        is_creator: Boolean indicating if the requesting user is the event creator
        is_participant: Boolean indicating if the requesting user is participating in the event
        participants: List of users participating in the event
        participant_count: Total number of participants in the event
        categories: List of categories assigned to the event
        image: URL or reference to the event image
        participant_details: Additional details about the requesting user's participation
    """

    author = UserSerializer(read_only=True, source='authorId')
    is_creator = SerializerMethodField()
    is_participant = serializers.SerializerMethodField()
    participants = UserSerializer(many=True, read_only=True)
    participant_count = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True, read_only=True)
    image = serializers.CharField(allow_blank=True, required=False)
    participant_details = SerializerMethodField()
        
    class Meta:
        model = Event
        fields = '__all__'

    def validate_categories(self, value):
        """
        Validate that all categories in the provided list are valid category choices.
        
        Args:
            value: List of Category objects to validate
            
        Returns:
            The validated list of Category objects
            
        Raises:
            ValidationError: If any category is not in the predefined choices
        """
        valid_category_names = [choice[0] for choice in Category.CATEGORY_CHOICES]
        for category in value:
            if category.name not in valid_category_names:
                raise serializers.ValidationError(f"Invalid category: {category.name}")
        return value

    def get_is_creator(self, obj):
        """
        Determine if the requesting user is the creator of the event.
        
        Args:
            obj: The Event instance being serialized
            
        Returns:
            Boolean indicating whether the requesting user is the event creator
        """
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return obj.authorId == request.user
        return False
    
    def get_is_participant(self, obj):
        """
        Determine if the requesting user is a participant in the event.
        
        Args:
            obj: The Event instance being serialized
            
        Returns:
            Boolean indicating whether the requesting user is participating in the event
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.participants.filter(id=request.user.id).exists()
        return False

    def get_participant_count(self, obj):
        """
        Get the total number of participants in the event.
        
        Args:
            obj: The Event instance being serialized
            
        Returns:
            Integer count of participants
        """
        return obj.participants.count()

    def get_participant_details(self, obj):
        """
        Get additional details about the requesting user's participation in the event.
        
        Args:
            obj: The Event instance being serialized
            
        Returns:
            Serialized EventParticipant data if the user is a participant, None otherwise
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                participant = EventParticipant.objects.get(eventId=obj, userId=request.user)
                return EventParticipantSerializer(participant).data
            except EventParticipant.DoesNotExist:
                return None
        return None