from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    data = JSONParser().parse(request)
    data['authorId'] = request.user.id  
    serializer = EventSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)