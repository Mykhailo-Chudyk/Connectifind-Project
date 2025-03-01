from django.test import TestCase
from django.utils import timezone
import datetime
from event_participants.models import EventParticipant
from users.models import User
from events.models import Event

class EventParticipantModelTest(TestCase):
    def setUp(self):
        """Set up test data for EventParticipant model tests"""
        # Create test user
        self.user = User.objects.create_user(
            email='user@example.com',
            password='password123'
        )
        
        # Create test event
        self.event_time = timezone.now() + datetime.timedelta(days=7)
        self.event = Event.objects.create(
            authorId=self.user,
            title='Test Event',
            description='Test Event Description',
            location='Test Location',
            time=self.event_time,
            visibility='public'
        )
        
        # Create test event participant
        self.event_participant = EventParticipant.objects.create(
            userId=self.user,
            eventId=self.event,
            firstName='John',
            lastName='Doe',
            description='Test description',
            goal='Test goal'
        )

    def test_event_participant_creation(self):
        """Test basic event participant creation and field values"""
        self.assertEqual(self.event_participant.firstName, 'John')
        self.assertEqual(self.event_participant.lastName, 'Doe')
        self.assertEqual(self.event_participant.description, 'Test description')
        self.assertEqual(self.event_participant.goal, 'Test goal')
        self.assertIsNone(self.event_participant.avatar)  # Should be null by default
        self.assertEqual(self.event_participant.userId, self.user)
        self.assertEqual(self.event_participant.eventId, self.event)
        
    def test_event_participant_string_representation(self):
        """Test the string representation of an event participant"""
        expected_str = f"John Doe - {self.event}"
        self.assertEqual(str(self.event_participant), expected_str)
    
    def test_event_participant_relationships(self):
        """Test relationships with users and events"""
        # Test user relationship
        self.assertEqual(self.event_participant.userId, self.user)
        
        # Test event relationship
        self.assertEqual(self.event_participant.eventId, self.event)
        
    def test_optional_fields(self):
        """Test that optional fields can be null"""
        # Create a participant with minimal fields
        minimal_participant = EventParticipant.objects.create(
            userId=self.user,
            eventId=self.event,
            firstName='Jane',
            lastName='Smith'
        )
        
        self.assertIsNone(minimal_participant.description)
        self.assertIsNone(minimal_participant.goal)
        self.assertIsNone(minimal_participant.avatar) 