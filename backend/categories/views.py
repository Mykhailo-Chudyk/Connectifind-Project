"""
Views for the categories app.

This module contains the API views for retrieving Category information.
"""
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Category
from .serializers import CategorySerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def list_categories(request):
    """
    List all categories.
    
    Returns a list of all available categories in the system.
    
    Args:
        request: The HTTP request object.
        
    Returns:
        Response: A DRF Response object containing serialized category data.
    """
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
