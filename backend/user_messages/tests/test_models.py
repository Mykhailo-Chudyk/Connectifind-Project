from django.test import TestCase
from django.utils import timezone
import datetime
from user_messages.models import Message
from users.models import User
from events.models import Event
from chats.models import Chat

class MessageModelTest(TestCase):
    def setUp(self):
        """Set up test data for Message model tests"""
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
        self.chat.participants.add(self.user1, self.user2)
        
        # Create test message
        self.message = Message.objects.create(
            chat=self.chat,
            author=self.user1,
            content='Hello, this is a test message'
        )

    def test_message_creation(self):
        """Test basic message creation and field values"""
        self.assertEqual(self.message.content, 'Hello, this is a test message')
        self.assertEqual(self.message.author, self.user1)
        self.assertEqual(self.message.chat, self.chat)
        self.assertIsNotNone(self.message.time)  # auto_now_add should set a time
        
    def test_message_string_representation(self):
        """Test the string representation of a message"""
        # Note: The model has chatId and authorId fields in the __str__ method
        # but the actual fields are chat and author - adjust this test if needed
        expected_str = f"Message by {self.message.author} in {self.message.chat}"
        self.assertEqual(str(self.message), expected_str)
    
    def test_message_relationships(self):
        """Test relationships with users and chats"""
        # Test author relationship
        self.assertEqual(self.message.author, self.user1)
        
        # Test chat relationship
        self.assertEqual(self.message.chat, self.chat) 