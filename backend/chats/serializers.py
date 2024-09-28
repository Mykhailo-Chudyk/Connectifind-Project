from rest_framework import serializers
from user_messages.models import Message
from users.serializers import UserSerializer

class ChatMessageSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True) 

    class Meta:
        model = Message
        fields = ['id', 'author', 'content', 'time']
