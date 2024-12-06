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
from .serializers import UserSerializer
import json

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
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    try:
        request.user.delete()
        return Response({"message": "User deleted successfully!"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    try:
        data = json.loads(request.body)
        user = request.user

        user.first_name = data.get('firstName', user.first_name)
        user.last_name = data.get('lastName', user.last_name)
        user.description = data.get('description', user.description)
        user.avatar = data.get('avatar', user.avatar)
        user.save()

        return Response({"message": "User profile updated successfully!"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)