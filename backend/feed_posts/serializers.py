from rest_framework import serializers
from .models import FeedPost, Event
from users.serializers import UserSerializer 

class FeedPostSerializer(serializers.ModelSerializer):
    """
    Serializer for the FeedPost model.
    
    Provides serialization of FeedPost objects including author information from
    the associated User model. Handles creation of new feed posts within the
    context of specific events.
    """
    author = UserSerializer(read_only=True, source='authorId') 

    class Meta:
        model = FeedPost
        fields = ['id', 'content', 'time', 'author'] 
        read_only_fields = ['id', 'time']  

    def create(self, validated_data):
        """
        Create and return a new FeedPost instance.
        
        Uses the current user as the author and associates the post with
        the event specified in the context.
        
        Args:
            validated_data (dict): Validated data for creating the feed post
            
        Returns:
            FeedPost: The newly created feed post instance
            
        Raises:
            Event.DoesNotExist: If the specified event ID is not found
        """
        request = self.context.get('request')
        author = request.user if request else None
        event_id = self.context.get('event_id')  
        event = Event.objects.get(id=event_id)  
        feed_post = FeedPost.objects.create(authorId=author, eventId=event, **validated_data)
        return feed_post