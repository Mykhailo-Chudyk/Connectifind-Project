from rest_framework import serializers
from .models import Event
from users.serializers import UserSerializer
from categories.serializers import CategorySerializer
from categories.models import Category
from rest_framework.fields import SerializerMethodField

class EventSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True, source='authorId')
    is_creator = SerializerMethodField()
    is_participant = serializers.SerializerMethodField()
    participants = UserSerializer(many=True, read_only=True)
    participant_count = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'

    def validate_categories(self, value):
        valid_category_names = [choice[0] for choice in Category.CATEGORY_CHOICES]
        for category in value:
            if category.name not in valid_category_names:
                raise serializers.ValidationError(f"Invalid category: {category.name}")
        return value

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