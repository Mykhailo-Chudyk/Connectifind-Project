from django.utils import timezone
from django.db.models import Q, Prefetch
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
import base64
from django.core.files.base import ContentFile
from event_participants.models import EventParticipant
import random
import string

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    data = JSONParser().parse(request)
    data['authorId'] = request.user.id  

    # Generate random 6-digit code for private events
    if data.get('visibility') == 'private':
        data['code'] = ''.join(random.choices(string.digits, k=6))

    serializer = EventSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        event = serializer.save()
        
        # Create EventParticipant record for the author
        EventParticipant.objects.create(
            eventId=event,
            userId=request.user,
            firstName=request.user.first_name,
            lastName=request.user.last_name,
            description='',
            goal='',
            avatar=request.user.profile.avatar if hasattr(request.user, 'profile') else ''
        )
        
        # Add author to participants
        event.participants.add(request.user)
        
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_events(request):
    if request.user.is_authenticated:
        # Exclude events where user is author or participant
        events = Event.objects.filter(
            visibility='public'
        ).exclude(
            Q(authorId=request.user) | 
            Q(participants=request.user)
        ).prefetch_related('participants')
    else:
        events = Event.objects.filter(visibility='public').prefetch_related('participants')

    # TODO: add pagination && show only future events!
    
    serializer = EventSerializer(events, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_event(request, uuid):
    try:
        event = Event.objects.get(pk=uuid)
        can_view = (
            event.visibility == 'public' or 
            (request.user.is_authenticated and (
                event.authorId == request.user or 
                request.user in event.participants.all()
            ))
        )
        
        if can_view:
            serializer = EventSerializer(event, context={'request': request, 'event_id': event.id})
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'You do not have permission to view this event.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
    except Event.DoesNotExist:
        raise Http404("Event does not exist.")
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_event(request, uuid):
    event = get_object_or_404(Event, pk=uuid)

    if event.authorId == request.user:
        return Response({'error': 'You cannot join your own event.'}, status=status.HTTP_403_FORBIDDEN)

    # Check if the user is already a participant
    participant, created = EventParticipant.objects.get_or_create(
        eventId=event,
        userId=request.user,
        defaults={
            'firstName': request.user.first_name,
            'lastName': request.user.last_name,
            'description': '',
            'goal': '',
            'avatar': request.user.profile.avatar if hasattr(request.user, 'profile') else ''
        }
    )

    if created:
        event.participants.add(request.user)
        return Response({'message': 'You have successfully joined the event!'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'You are already a participant of this event.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def leave_event(request, uuid):
    event = get_object_or_404(Event, pk=uuid)

    if event.authorId == request.user:
        return Response({'error': 'You cannot leave your own event.'}, status=status.HTTP_403_FORBIDDEN)
    
    # Remove from participants
    event.participants.remove(request.user)
    
    # Delete the EventParticipant record
    EventParticipant.objects.filter(
        eventId=event,
        userId=request.user
    ).delete()
    
    return Response({'message': 'You have successfully left the event!'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_events(request):
    events = Event.objects.filter(
        Q(authorId=request.user) | 
        Q(participants=request.user)
    ).order_by('-time')
    serializer = EventSerializer(events, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_event_with_code(request):
    data = JSONParser().parse(request)
    code = data.get('code')

    if not code:
        return Response({'error': 'Event code is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        event = Event.objects.get(code=code, visibility='private')
        
        if event.authorId == request.user:
            return Response({'error': 'You cannot join your own event.'}, status=status.HTTP_403_FORBIDDEN)

        # Check if the user is already a participant
        participant, created = EventParticipant.objects.get_or_create(
            eventId=event,
            userId=request.user,
            defaults={
                'firstName': request.user.first_name,
                'lastName': request.user.last_name,
                'description': '',
                'goal': '',
                'avatar': request.user.profile.avatar if hasattr(request.user, 'profile') else ''
            }
        )

        if created:
            event.participants.add(request.user)
            return Response({
                'message': 'You have successfully joined the event!',
                'event_id': event.id
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'You are already a participant of this event.',
                'event_id': event.id
            }, status=status.HTTP_200_OK)

    except Event.DoesNotExist:
        return Response({'error': 'Invalid event code.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, uuid):
    try:
        event = Event.objects.get(pk=uuid)
        
        if event.authorId != request.user:
            return Response(
                {'error': 'You do not have permission to delete this event.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
            
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    except Event.DoesNotExist:
        return Response(
            {'error': 'Event not found.'}, 
            status=status.HTTP_404_NOT_FOUND
        )