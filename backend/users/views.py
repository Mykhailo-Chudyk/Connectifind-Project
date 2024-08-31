from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
import json

@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
        user = User(
            firstName=data['firstName'],
            lastName=data['lastName'],
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
