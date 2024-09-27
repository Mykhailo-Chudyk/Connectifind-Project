from rest_framework import serializers
from .models import Event
from users.serializers import UserSerializer
from rest_framework.fields import SerializerMethodField

class EventSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True, source='authorId')
    is_creator = SerializerMethodField()
    is_participant = serializers.SerializerMethodField()
    participants = UserSerializer(many=True, read_only=True)
    participant_count = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = '__all__'

    def get_is_creator(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return obj.authorId == request.user
        return False
    
    def get_is_participant(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.participants.filter(id=request.user.id).exists()
        return False

    def get_participant_count(self, obj):
        return obj.participants.count()