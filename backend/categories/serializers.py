from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model.
    
    Converts Category model instances to JSON representation and vice versa.
    Used for API endpoints related to categories.
    
    Attributes:
        Meta: Configuration class that specifies the model and fields to include.
    """
    class Meta:
        model = Category
        fields = ['id', 'name']