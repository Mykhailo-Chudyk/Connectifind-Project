from django.test import TestCase
from django.utils import timezone
import datetime
from feed_posts.models import FeedPost
from users.models import User
from events.models import Event

class FeedPostModelTest(TestCase):
    def setUp(self):
        """Set up test data for FeedPost model tests"""
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
        
        # Create test feed post
        self.feed_post = FeedPost.objects.create(
            eventId=self.event,
            authorId=self.user,
            content='This is a test feed post'
        )

    def test_feed_post_creation(self):
        """Test basic feed post creation and field values"""
        self.assertEqual(self.feed_post.content, 'This is a test feed post')
        self.assertEqual(self.feed_post.authorId, self.user)
        self.assertEqual(self.feed_post.eventId, self.event)
        self.assertIsNotNone(self.feed_post.time)  # auto_now_add should set a time
        
    def test_feed_post_string_representation(self):
        """Test the string representation of a feed post"""
        expected_str = f"Post by {self.user} for event {self.event}"
        self.assertEqual(str(self.feed_post), expected_str)
    
    def test_feed_post_relationships(self):
        """Test relationships with users and events"""
        # Test author relationship
        self.assertEqual(self.feed_post.authorId, self.user)
        
        # Test event relationship
        self.assertEqual(self.feed_post.eventId, self.event) 