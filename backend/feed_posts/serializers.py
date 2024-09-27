from rest_framework import serializers
from .models import FeedPost, Event
from users.serializers import UserSerializer 

class FeedPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, source='authorId') 

    class Meta:
        model = FeedPost
        fields = ['id', 'content', 'time', 'author'] 
        read_only_fields = ['id', 'time']  

    def create(self, validated_data):
        request = self.context.get('request')
        author = request.user if request else None
        event_id = self.context.get('event_id')  
        event = Event.objects.get(id=event_id)  
        feed_post = FeedPost.objects.create(authorId=author, eventId=event, **validated_data)
        return feed_post