from django.utils import timezone
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    data = JSONParser().parse(request)
    data['authorId'] = request.user.id  
    serializer = EventSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_events(request):
    current_time = timezone.now()
    events = Event.objects.filter(
        Q(visibility='public') |
        Q(authorId=request.user),
        time__gte=current_time
    )
    serializer = EventSerializer(events, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event(request, uuid):
    try:
        event = Event.objects.get(pk=uuid)
        serializer = EventSerializer(event, context={'request': request})
        return Response(serializer.data)
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_event(request, uuid):
    event = get_object_or_404(Event, pk=uuid)

    if event.authorId == request.user:
        return Response({'error': 'You cannot join your own event.'}, status=status.HTTP_403_FORBIDDEN)
    
    event.participants.add(request.user)
    return Response({'message': 'You have successfully joined the event!'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def leave_event(request, uuid):
    event = get_object_or_404(Event, pk=uuid)

    if event.authorId == request.user:
        return Response({'error': 'You cannot leave your own event.'}, status=status.HTTP_403_FORBIDDEN)
    
    event.participants.remove(request.user)
    return Response({'message': 'You have successfully leave the event!'})