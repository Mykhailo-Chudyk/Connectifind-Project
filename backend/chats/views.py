from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chat, Event, User
from user_messages.models import Message
from .serializers import ChatMessageSerializer
from users.serializers import UserSerializer
from rest_framework import status
from django.db import models
from django.db.models import Q

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_chat_messages(request, eventId, senderId):
    """
    Retrieve all messages between the current user and a specific sender for a given event.
    
    Parameters:
    - request: The HTTP request object containing the authenticated user
    - eventId: The ID of the event context for the chat
    - senderId: The ID of the user who sent the messages
    
    Returns:
    - Response with serialized chat messages if found
    - 404 error response if no chat exists between these users for this event
    """
    event = get_object_or_404(Event, pk=eventId)
    sender = get_object_or_404(User, pk=senderId)
    
    # Retrieve the chat where both the current user and sender are participants
    chat = Chat.objects.filter(
        event=event,
        participants=request.user
    ).filter(
        participants=sender
    ).distinct().first()

    if chat:
        # Retrieve all messages in the specific chat, ordered by time
        messages = Message.objects.filter(chat=chat).order_by('time')
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "No chat found between these users for this event"}, status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_chat_message(request, eventId, recipientId):
    """
    Send a new chat message to a specific recipient within an event context.
    
    This endpoint creates a new chat if one doesn't exist between the users.
    
    Parameters:
    - request: The HTTP request object containing the authenticated user and message data
    - eventId: The ID of the event context for the chat
    - recipientId: The ID of the message recipient
    
    Returns:
    - Response with serialized message data and 201 status if successful
    - Response with validation errors and 400 status if request data is invalid
    """
    event = get_object_or_404(Event, pk=eventId)
    recipient = get_object_or_404(User, pk=recipientId)

    # Retrieve or create a chat with both participants and the event
    chat = Chat.objects.filter(
        event=event,
        participants=request.user
    ).filter(
        participants=recipient
    ).distinct().first()

    if not chat:
        # Create a new chat if none exists
        chat = Chat.objects.create(event=event)
        chat.participants.add(request.user, recipient)

    serializer = ChatMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user, chat=chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users_with_messages(request, eventId):
    """
    Retrieve a list of all users with whom the current user has exchanged messages 
    within a specific event context.
    
    For each user, includes their information and the last message exchanged.
    
    Parameters:
    - request: The HTTP request object containing the authenticated user
    - eventId: The ID of the event to filter chats by
    
    Returns:
    - Response with a list of users and their last message details
    """
    event = get_object_or_404(Event, pk=eventId)
    current_user = request.user

    chats = Chat.objects.filter(event=event, participants=current_user)

    users_with_messages = User.objects.filter(
        chats__in=chats
    ).exclude(id=current_user.id).distinct()

    response_data = []
    for user in users_with_messages:
        chat = chats.filter(participants=user).first()
        
        last_message = Message.objects.filter(chat=chat).order_by('-time').first()
        
        response_data.append({
            'user': UserSerializer(user).data,
            'last_message_content': last_message.content if last_message else None,
            'last_message_time': last_message.time if last_message else None
        })

    return Response(response_data)