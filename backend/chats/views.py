from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chat, Event, User
from .serializers import ChatMessageSerializer
from users.serializers import UserSerializer
from rest_framework import status
from django.db import models
from django.db.models import Q

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_chat_messages(request, eventId, senderId):
    event = get_object_or_404(Event, pk=eventId)
    sender = get_object_or_404(User, pk=senderId)
    chat = Chat.objects.filter(event=event, participants__in=[sender, request.user]).distinct()
    if chat.exists():
        messages = chat.first().messages.all()
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "No chat found between these users for this event"}, status=404)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_chat_messages(request, eventId, senderId):
    event = get_object_or_404(Event, pk=eventId)
    sender = get_object_or_404(User, pk=senderId)
    
    chats = Chat.objects.filter(event=event, participants=sender).filter(participants=request.user)

    if chats.exists():
        chat = chats.first()
        messages = chat.message_set.all() 
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)
    else:
        new_chat = Chat.objects.create(event=event)
        new_chat.participants.add(request.user, sender)
        new_chat.save()
        return Response({"message": "New chat created, no messages yet"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_chat_message(request, eventId, recipientId):
    event = get_object_or_404(Event, pk=eventId)
    recipient = get_object_or_404(User, pk=recipientId)

    chat, created = Chat.objects.get_or_create(
        event=event,
        defaults={'event': event}
    )
    chat.participants.add(request.user, recipient)

    if chat.participants.count() > 2:
        chat = Chat.objects.create(event=event)
        chat.participants.set([request.user, recipient])

    serializer = ChatMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user, chat=chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users_with_messages(request, eventId):
    event = get_object_or_404(Event, pk=eventId)
    current_user = request.user

    chats = Chat.objects.filter(event=event, participants=current_user)
    
    users_with_messages = User.objects.filter(
        chats__in=chats
    ).exclude(id=current_user.id).distinct()

    serializer = UserSerializer(users_with_messages, many=True)
    
    return Response(serializer.data)