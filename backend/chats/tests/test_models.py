from django.test import TestCase
from django.utils import timezone
import datetime
from chats.models import Chat
from users.models import User
from events.models import Event

class ChatModelTest(TestCase):
    def setUp(self):
        """Set up test data for Chat model tests"""
        # Create test users
        self.user1 = User.objects.create_user(
            email='user1@example.com',
            password='password123',
            username='user1'
        )
        self.user2 = User.objects.create_user(
            email='user2@example.com',
            password='password123',
            username='user2'
        )
        
        # Create test event
        self.event_time = timezone.now() + datetime.timedelta(days=7)
        self.event = Event.objects.create(
            authorId=self.user1,
            title='Test Event',
            description='Test Event Description',
            location='Test Location',
            time=self.event_time,
            visibility='public'
        )
        
        # Create test chat
        self.chat = Chat.objects.create(
            event=self.event
        )
        # Add participants
        self.chat.participants.add(self.user1, self.user2)

    def test_chat_creation(self):
        """Test basic chat creation and field values"""
        self.assertEqual(self.chat.event, self.event)
        self.assertIsNotNone(self.chat.id)  # UUID should be generated
        
    def test_chat_string_representation(self):
        """Test the string representation of a chat"""
        participants_str = ", ".join([user.username for user in self.chat.participants.all()])
        expected_str = f"Chat in {self.event.title} between {participants_str}"
        self.assertEqual(str(self.chat), expected_str)
    
    def test_chat_relationships(self):
        """Test relationships with users and events"""
        # Test event relationship
        self.assertEqual(self.chat.event, self.event)
        
        # Test participants relationship
        self.assertEqual(self.chat.participants.count(), 2)
        self.assertIn(self.user1, self.chat.participants.all())
        self.assertIn(self.user2, self.chat.participants.all())
        
        # Test reverse relationship from event to chats
        self.assertIn(self.chat, self.event.chats.all())
        
        # Test reverse relationship from user to chats
        self.assertIn(self.chat, self.user1.chats.all())
        self.assertIn(self.chat, self.user2.chats.all()) 