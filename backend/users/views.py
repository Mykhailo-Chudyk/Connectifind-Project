from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import User
from events.models import Event
from feed_posts.models import FeedPost
from chats.models import Chat
from event_participants.models import EventParticipant
from user_messages.models import Message
from .serializers import UserSerializer
import json
from rest_framework import status
from django.core.files.base import ContentFile
import base64
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings

@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
        user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            password=make_password(data['password']),
            description=data.get('description', ''),
            avatar=data.get('avatar', '')
        )
        user.save()

        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'message': 'User registered successfully!',
            'id': str(user.id),
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    user = authenticate(email=email, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'message': 'User logged in successfully!',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    
    # Update basic info
    user.first_name = request.data.get('firstName', user.first_name)
    user.last_name = request.data.get('lastName', user.last_name)
    user.description = request.data.get('description', user.description)
    
    # Handle avatar
    avatar = request.data.get('avatar')
    if avatar is not None:  # Check if avatar field was included in request
        # Convert FormData string 'null' to Python None
        if avatar == 'null' or avatar == '':
            user.avatar = None
        else:
            user.avatar = avatar
    
    try:
        user.save()
        return Response({
            'message': 'Profile updated successfully',
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'description': user.description,
                'avatar': user.avatar or ''  # Ensure we don't send None
            }
        })
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        data = json.loads(request.body)
        user = request.user

        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')

        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect"}, status=400)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully!"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        user = request.user

        Event.objects.filter(authorId=user).delete()

        user.joined_events.clear()

        EventParticipant.objects.filter(userId=user).delete()

        FeedPost.objects.filter(authorId=user).delete()

        Message.objects.filter(author=user).delete()

        Chat.objects.filter(participants=user).delete()

        user.delete()

        return Response({"message": "User account and all associated data deleted successfully!"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def google_auth(request):
    try:
        data = json.loads(request.body)
        token = data.get('token')
        
        # Verify the token
        idinfo = id_token.verify_oauth2_token(
            token, 
            requests.Request(), 
            settings.GOOGLE_OAUTH2_CLIENT_ID
        )

        email = idinfo['email']
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Create new user
            user = User(
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=make_password(None)  # Random password as they'll use Google auth
            )
            user.save()
        
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'message': 'Successfully authenticated with Google',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)