from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'content', 'time', 'author_username']
        read_only_fields = fields
