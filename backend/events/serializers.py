from rest_framework import serializers
from .models import Event
from users.serializers import UserSerializer
from rest_framework.fields import SerializerMethodField

class EventSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True, source='authorId')
    is_creator = SerializerMethodField()
    class Meta:
        model = Event
        fields = '__all__'

    def get_is_creator(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return obj.authorId == request.user
        return False
