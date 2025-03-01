from rest_framework import serializers
from user_messages.models import Message
from users.serializers import UserSerializer

class ChatMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for the Message model.
    
    This serializer is used for chat message representation in API responses.
    It includes the message's ID, author details (serialized using UserSerializer),
    content, and timestamp.
    
    Fields:
        id: The unique identifier for the message
        author: The user who sent the message (nested serialized representation)
        content: The text content of the message
        time: The timestamp when the message was sent
    """
    author = UserSerializer(read_only=True) 

    class Meta:
        model = Message
        fields = ['id', 'author', 'content', 'time']
