from rest_framework import serializers
from .models import Event
from users.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True, source='authorId')
    class Meta:
        model = Event
        fields = '__all__'
