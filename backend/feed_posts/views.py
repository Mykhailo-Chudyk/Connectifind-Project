from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Event, FeedPost
from .serializers import FeedPostSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_feed_posts(request, eventId):
    """
    Retrieve a list of feed posts for a specific event.
    
    Args:
        request (Request): The request object.
        eventId (int): The ID of the event to retrieve feed posts for.
        
    Returns:
        Response: A list of feed posts if the user is a participant of the event,
                 or an error message if the user is not authorized.
    """
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
    """
    Create a new feed post for a specific event.
    
    Args:
        request (Request): The request object containing the feed post data.
        eventId (int): The ID of the event to create the feed post for.
        
    Returns:
        Response: The created feed post data with 201 status code if successful,
                 or error details with 400 status code if validation fails.
    """
    event = get_object_or_404(Event, pk=eventId)
    serializer = FeedPostSerializer(data=request.data, context={'request': request, 'event_id': eventId})
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)