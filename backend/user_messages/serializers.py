from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer for the Message model.
    
    This serializer converts Message model instances to and from JSON representations.
    It includes the message ID, content, timestamp, and the username of the author.
    
    The author_username field is derived from the related User model via the author field.
    """
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'content', 'time', 'author_username']
        read_only_fields = fields
