from django.test import TestCase
from users.models import User

class UserModelTest(TestCase):
    def setUp(self):
        """Set up test data for User model tests"""
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword123',
            description='Test description',
            goal='Test goal'
        )

    def test_user_creation(self):
        """Test the creation of a user"""
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.username, 'test@example.com')
        self.assertEqual(self.user.description, 'Test description')
        self.assertEqual(self.user.goal, 'Test goal')
        self.assertTrue(self.user.check_password('testpassword123'))

    def test_user_string_representation(self):
        """Test the string representation of a user"""
        self.assertEqual(str(self.user), 'test@example.com')

    def test_custom_user_manager(self):
        """Test the custom user manager"""
        user_count = User.objects.count()
        self.assertEqual(user_count, 1)
        
        # Test creating a superuser
        admin = User.objects.create_superuser(
            email='admin@example.com',
            password='adminpassword123'
        )
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertEqual(User.objects.count(), 2) 