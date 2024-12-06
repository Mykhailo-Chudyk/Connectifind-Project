from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import EventParticipant
from .serializers import EventParticipantSerializer

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_goal(request, event_id):
    try:
        participant = get_object_or_404(EventParticipant, eventId__id=event_id, userId__id=request.user.id)
        
        goal = request.data.get('goal', None)
        
        if goal is not None:
            participant.goal = goal
            participant.save()

            return Response({'message': 'Goal updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Goal is required'}, status=status.HTTP_400_BAD_REQUEST)
    except EventParticipant.DoesNotExist:
        return Response({'error': 'No matching EventParticipant found'}, status=status.HTTP_404_NOT_FOUND)
