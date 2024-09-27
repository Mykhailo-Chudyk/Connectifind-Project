from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Event, FeedPost
from .serializers import FeedPostSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_feed_posts(request, eventId):
    event = get_object_or_404(Event, pk=eventId)
    if request.user in event.participants.all():
        posts = FeedPost.objects.filter(eventId=event)
        serializer = FeedPostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
    else:
        return Response({"error": "User is not a participant of this event"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_feed_post(request, eventId):
    event = get_object_or_404(Event, pk=eventId)
    serializer = FeedPostSerializer(data=request.data, context={'request': request, 'event_id': eventId})
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)