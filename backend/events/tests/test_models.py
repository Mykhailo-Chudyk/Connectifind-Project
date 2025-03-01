from django.test import TestCase
from django.utils import timezone
from events.models import Event
from users.models import User
from categories.models import Category
import datetime

class EventModelTest(TestCase):
    def setUp(self):
        """Set up test data for Event model tests"""
        # Create test users
        self.user1 = User.objects.create_user(
            email='organizer@example.com',
            password='password123',
            description='Event organizer'
        )
        self.user2 = User.objects.create_user(
            email='participant@example.com',
            password='password123'
        )
        
        # Create test categories
        self.category1 = Category.objects.create(name='Technology')
        self.category2 = Category.objects.create(name='Networking')
        
        # Create test event
        self.event_time = timezone.now() + datetime.timedelta(days=7)
        self.event = Event.objects.create(
            authorId=self.user1,
            title='Test Event',
            description='This is a test event',
            location='Test Location',
            time=self.event_time,
            capacity=50,
            visibility='public',
            duration=120
        )
        
        # Add categories and participants
        self.event.categories.add(self.category1, self.category2)
        self.event.participants.add(self.user2)

    def test_event_creation(self):
        """Test basic event creation and field values"""
        self.assertEqual(self.event.title, 'Test Event')
        self.assertEqual(self.event.description, 'This is a test event')
        self.assertEqual(self.event.location, 'Test Location')
        self.assertEqual(self.event.time, self.event_time)
        self.assertEqual(self.event.capacity, 50)
        self.assertEqual(self.event.visibility, 'public')
        self.assertEqual(self.event.duration, 120)
        self.assertEqual(self.event.authorId, self.user1)

    def test_event_string_representation(self):
        """Test the string representation of an event"""
        expected_str = f"Test Event - Test Location on {self.event_time}"
        self.assertEqual(str(self.event), expected_str)
        
    def test_event_relationships(self):
        """Test relationships with users and categories"""
        # Test author relationship
        self.assertEqual(self.event.authorId, self.user1)
        
        # Test participants relationship
        self.assertEqual(self.event.participants.count(), 1)
        self.assertIn(self.user2, self.event.participants.all())
        
        # Test categories relationship
        self.assertEqual(self.event.categories.count(), 2)
        self.assertIn(self.category1, self.event.categories.all())
        self.assertIn(self.category2, self.event.categories.all()) 